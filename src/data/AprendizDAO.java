package sena.deportest.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import sena.deportest.conexion.ClsConexion;

/**
 * CLASE: AprendizDAO
 * PATRÓN DE DISEÑO: Data Access Object (DAO)
 * DESCRIPCIÓN: Implementa las operaciones CRUD para la tabla 'aprendices'.
 * ARQUITECTURA: Capa de Datos (Modelo-Vista-Controlador - MVC)
 * 
 * Normas de Seguridad Aplicadas: 
 * - Uso OBLIGATORIO de Prepared Statements para evitar ataques de Inyección SQL.
 * - Clausura estricta de ResultSet y PreparedStatement en bloques 'finally' para evitar fugas de memoria.
 * 
 * @author Instructor Técnico & Arquitecto de Software Senior
 * @version 1.0 (DEPORTEST)
 */
public class AprendizDAO {

    // Instancia de conexión global compartida
    private Connection con = null;

    /**
     * Modelo simple embebido de datos para representar al Aprendiz.
     * Facilita la modularidad en arquitecturas MVC (Clase DTO integrada).
     */
    public static class AprendizDTO {
        private String documentoIdentidad;
        private String nombre;
        private String apellido;
        private String correoInstitucional;
        private java.sql.Date fechaNacimiento;
        private String genero;
        private String programaFormacion;
        private String fichaCaracterizacion;
        private String estado;

        // Constructor por defecto
        public AprendizDTO() {}

        // Constructor parametrizado
        public AprendizDTO(String doc, String nom, String ape, String correo, java.sql.Date fNac, String gen, String prog, String ficha, String est) {
            this.documentoIdentidad = doc;
            this.nombre = nom;
            this.apellido = ape;
            this.correoInstitucional = correo;
            this.fechaNacimiento = fNac;
            this.genero = gen;
            this.programaFormacion = prog;
            this.fichaCaracterizacion = ficha;
            this.estado = est;
        }

        // Getters y Setters
        public String getDocumentoIdentidad() { return documentoIdentidad; }
        public void setDocumentoIdentidad(String doc) { this.documentoIdentidad = doc; }
        
        public String getNombre() { return nombre; }
        public void setNombre(String nom) { this.nombre = nom; }
        
        public String getApellido() { return apellido; }
        public void setApellido(String ape) { this.apellido = ape; }
        
        public String getCorreoInstitucional() { return correoInstitucional; }
        public void setCorreoInstitucional(String correo) { this.correoInstitucional = correo; }
        
        public java.sql.Date getFechaNacimiento() { return fechaNacimiento; }
        public void setFechaNacimiento(java.sql.Date fNac) { this.fechaNacimiento = fNac; }
        
        public String getGenero() { return genero; }
        public void setGenero(String gen) { this.genero = gen; }
        
        public String getProgramaFormacion() { return programaFormacion; }
        public void setProgramaFormacion(String prog) { this.programaFormacion = prog; }
        
        public String getFichaCaracterizacion() { return fichaCaracterizacion; }
        public void setFichaCaracterizacion(String ficha) { this.fichaCaracterizacion = ficha; }
        
        public String getEstado() { return estado; }
        public void setEstado(String est) { this.estado = est; }

        @Override
        public String toString() {
            return nombre + " " + apellido + " (" + documentoIdentidad + ")";
        }
    }

    /**
     * OPERACIÓN: INSERT (Crear)
     * Inserta un nuevo registro de Aprendiz en la base de datos de manera segura.
     * 
     * @param aprendiz Datos del aprendiz a registrar.
     * @return boolean Verdadero si la operación fue exitosa, Falso en caso contrario.
     */
    public boolean registrarAprendiz(AprendizDTO aprendiz) {
        String query = "INSERT INTO aprendices (documento_identidad, nombre, apellido, correo_institucional, " +
                       "fecha_nacimiento, genero, programa_formacion, ficha_caracterizacion, estado) " +
                       "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
        
        PreparedStatement ps = null;
        
        try {
            // Obtener conexión activa desde el Singleton
            con = ClsConexion.getInstancia().getConexion();
            
            // Compilar consulta preparada (PREPARED STATEMENT)
            ps = con.prepareStatement(query);
            
            // Enlazar parámetros de forma segura tipada
            ps.setString(1, aprendiz.getDocumentoIdentidad());
            ps.setString(2, aprendiz.getNombre());
            ps.setString(3, aprendiz.getApellido());
            ps.setString(4, aprendiz.getCorreoInstitucional());
            ps.setDate(5, aprendiz.getFechaNacimiento());
            ps.setString(6, aprendiz.getGenero());
            ps.setString(7, aprendiz.getProgramaFormacion());
            ps.setString(8, aprendiz.getFichaCaracterizacion());
            ps.setString(9, aprendiz.getEstado() != null ? aprendiz.getEstado() : "ACTIVO");
            
            // Ejecutar actualización
            int filasAfectadas = ps.executeUpdate();
            return filasAfectadas > 0;
            
        } catch (SQLException ex) {
            Logger.getLogger(AprendizDAO.class.getName()).log(Level.SEVERE, "Error al registrar aprendiz (Inyección prevenida): " + ex.getMessage(), ex);
            return false;
        } finally {
            // Liberación de recursos JDBC en el orden correcto
            try {
                if (ps != null) ps.close();
            } catch (SQLException ex) {
                Logger.getLogger(AprendizDAO.class.getName()).log(Level.SEVERE, "Error al cerrar recursos en registrarAprendiz", ex);
            }
        }
    }

    /**
     * OPERACIÓN: SELECT ALL (Leer Todos)
     * Obtiene una lista de todos los aprendices registrados.
     * 
     * @return List<AprendizDTO> Lista de aprendices.
     */
    public List<AprendizDTO> listarAprendices() {
        List<AprendizDTO> lista = new ArrayList<>();
        String query = "SELECT * FROM aprendices ORDER BY apellido, nombre";
        
        PreparedStatement ps = null;
        ResultSet rs = null;
        
        try {
            con = ClsConexion.getInstancia().getConexion();
            ps = con.prepareStatement(query);
            rs = ps.executeQuery();
            
            while (rs.next()) {
                AprendizDTO ap = new AprendizDTO(
                    rs.getString("documento_identidad"),
                    rs.getString("nombre"),
                    rs.getString("apellido"),
                    rs.getString("correo_institucional"),
                    rs.getDate("fecha_nacimiento"),
                    rs.getString("genero"),
                    rs.getString("programa_formacion"),
                    rs.getString("ficha_caracterizacion"),
                    rs.getString("estado")
                );
                lista.add(ap);
            }
        } catch (SQLException ex) {
            Logger.getLogger(AprendizDAO.class.getName()).log(Level.SEVERE, "Error al consultar la lista de aprendices", ex);
        } finally {
            try {
                if (rs != null) rs.close();
                if (ps != null) ps.close();
            } catch (SQLException ex) {
                Logger.getLogger(AprendizDAO.class.getName()).log(Level.SEVERE, "Error al cerrar recursos en listarAprendices", ex);
            }
        }
        return lista;
    }

    /**
     * OPERACIÓN: SELECT BY ID (Leer por Documento)
     * Busca un aprendiz específico a partir de su documento de identidad.
     * 
     * @param documento Documento de identidad del aprendiz.
     * @return AprendizDTO Objeto con la información o null si no se encuentra.
     */
    public AprendizDTO buscarPorDocumento(String documento) {
        String query = "SELECT * FROM aprendices WHERE documento_identidad = ?";
        PreparedStatement ps = null;
        ResultSet rs = null;
        
        try {
            con = ClsConexion.getInstancia().getConexion();
            ps = con.prepareStatement(query);
            ps.setString(1, documento);
            rs = ps.executeQuery();
            
            if (rs.next()) {
                return new AprendizDTO(
                    rs.getString("documento_identidad"),
                    rs.getString("nombre"),
                    rs.getString("apellido"),
                    rs.getString("correo_institucional"),
                    rs.getDate("fecha_nacimiento"),
                    rs.getString("genero"),
                    rs.getString("programa_formacion"),
                    rs.getString("ficha_caracterizacion"),
                    rs.getString("estado")
                );
            }
        } catch (SQLException ex) {
            Logger.getLogger(AprendizDAO.class.getName()).log(Level.SEVERE, "Error al buscar aprendiz por documento", ex);
        } finally {
            try {
                if (rs != null) rs.close();
                if (ps != null) ps.close();
            } catch (SQLException ex) {
                Logger.getLogger(AprendizDAO.class.getName()).log(Level.SEVERE, "Error al cerrar recursos en buscarPorDocumento", ex);
            }
        }
        return null;
    }

    /**
     * OPERACIÓN: UPDATE (Actualizar)
     * Modifica los datos de un aprendiz existente.
     * 
     * @param aprendiz Datos del aprendiz a modificar.
     * @return boolean Verdadero si la actualización tuvo éxito.
     */
    public boolean actualizarAprendiz(AprendizDTO aprendiz) {
        String query = "UPDATE aprendices SET nombre = ?, apellido = ?, correo_institucional = ?, " +
                       "fecha_nacimiento = ?, genero = ?, programa_formacion = ?, ficha_caracterizacion = ?, estado = ? " +
                       "WHERE documento_identidad = ?";
        PreparedStatement ps = null;
        
        try {
            con = ClsConexion.getInstancia().getConexion();
            ps = con.prepareStatement(query);
            
            ps.setString(1, aprendiz.getNombre());
            ps.setString(2, aprendiz.getApellido());
            ps.setString(3, aprendiz.getCorreoInstitucional());
            ps.setDate(4, aprendiz.getFechaNacimiento());
            ps.setString(5, aprendiz.getGenero());
            ps.setString(6, aprendiz.getProgramaFormacion());
            ps.setString(7, aprendiz.getFichaCaracterizacion());
            ps.setString(8, aprendiz.getEstado());
            ps.setString(9, aprendiz.getDocumentoIdentidad());
            
            int filasAfectadas = ps.executeUpdate();
            return filasAfectadas > 0;
            
        } catch (SQLException ex) {
            Logger.getLogger(AprendizDAO.class.getName()).log(Level.SEVERE, "Error al actualizar aprendiz: " + ex.getMessage(), ex);
            return false;
        } finally {
            try {
                if (ps != null) ps.close();
            } catch (SQLException ex) {
                Logger.getLogger(AprendizDAO.class.getName()).log(Level.SEVERE, "Error al cerrar recursos en actualizarAprendiz", ex);
            }
        }
    }
}
