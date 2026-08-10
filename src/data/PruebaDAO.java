package sena.deportest.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.logging.Level;
import java.util.logging.Logger;
import sena.deportest.conexion.ClsConexion;

/**
 * CLASE: PruebaDAO
 * PATRÓN DE DISEÑO: Data Access Object (DAO)
 * DESCRIPCIÓN: Administra los registros de las pruebas atléticas y su transaccionalidad.
 * ARQUITECTURA: Capa de Datos (Modelo-Vista-Controlador - MVC)
 * 
 * REGLA ESTRICTA DE DESARROLLO (Transaccionalidad - ACID):
 * Toda operación múltiple (como registrar un resultado deficiente y asignarle
 * inmediatamente un Plan de Mejoramiento junto al cambio de estado del aprendiz)
 * SE REALIZA EN UN BLOQUE TRANSACCIONAL SEGURO CON COMMIT Y ROLLBACK.
 * 
 * @author Instructor Técnico & Arquitecto de Software Senior
 * @version 1.0 (DEPORTEST)
 */
public class PruebaDAO {

    private Connection con = null;

    /**
     * Modelo simple DTO para representar el Registro de una Prueba Física.
     */
    public static class RegistroPruebaDTO {
        private int idRegistro;
        private String documentoAprendiz;
        private int idPrueba;
        private java.sql.Date fechaRealizacion;
        private double resultado;
        private String observacion;
        private int idInstructorRegistro;

        public RegistroPruebaDTO() {}

        public RegistroPruebaDTO(String doc, int prueba, java.sql.Date fecha, double res, String obs, int inst) {
            this.documentoAprendiz = doc;
            this.idPrueba = prueba;
            this.fechaRealizacion = fecha;
            this.resultado = res;
            this.observacion = obs;
            this.idInstructorRegistro = inst;
        }

        // Getters y Setters
        public int getIdRegistro() { return idRegistro; }
        public void setIdRegistro(int id) { this.idRegistro = id; }
        
        public String getDocumentoAprendiz() { return documentoAprendiz; }
        public void setDocumentoAprendiz(String doc) { this.documentoAprendiz = doc; }
        
        public int getIdPrueba() { return idPrueba; }
        public void setIdPrueba(int id) { this.idPrueba = id; }
        
        public java.sql.Date getFechaRealizacion() { return fechaRealizacion; }
        public void setFechaRealizacion(java.sql.Date fecha) { this.fechaRealizacion = fecha; }
        
        public double getResultado() { return resultado; }
        public void setResultado(double res) { this.resultado = res; }
        
        public String getObservacion() { return observacion; }
        public void setObservacion(String obs) { this.observacion = obs; }
        
        public int getIdInstructorRegistro() { return idInstructorRegistro; }
        public void setIdInstructorRegistro(int inst) { this.idInstructorRegistro = inst; }
    }

    /**
     * TRANSACCIÓN COMPLETA (ACID): registrarPruebaYGenerarPlanDeMejoramiento
     * 
     * Propósito: Registra el resultado físico de un aprendiz. Si el rendimiento es deficiente,
     * el sistema de forma atómica:
     *   1. Registra la prueba en 'registro_pruebas'.
     *   2. Genera un plan de mejoramiento con tareas específicas en 'planes_mejoramiento'.
     *   3. Actualiza el estado del aprendiz a 'PLAN_MEJORAMIENTO' en la tabla 'aprendices'.
     * 
     * Si cualquiera de estos 3 pasos falla, se ejecuta un ROLLBACK absoluto para mantener
     * la integridad referencial y de negocio de la base de datos (Estado Consistente).
     * 
     * @param registro Datos del resultado atlético.
     * @param esDeficiente Indica si el puntaje califica como bajo y requiere intervención.
     * @param descripcionPlan Actividades detalladas del plan de mejoramiento físico.
     * @param fechaLimite Fecha límite de cumplimiento del plan.
     * @return boolean Verdadero si toda la transacción se completó con éxito (COMMIT).
     */
    public boolean registrarPruebaTransaccional(RegistroPruebaDTO registro, boolean esDeficiente, String descripcionPlan, java.sql.Date fechaLimite) {
        
        PreparedStatement psRegistro = null;
        PreparedStatement psPlan = null;
        PreparedStatement psAprendiz = null;
        ResultSet rsClavesGeneradas = null;
        
        boolean transaccionExitosa = false;

        try {
            // 1. Obtener la conexión a la base de datos
            con = ClsConexion.getInstancia().getConexion();
            
            // 2. DESACTIVAR EL AUTO-COMMIT (Paso crítico para iniciar transacción JDBC)
            con.setAutoCommit(false);
            System.out.println("DEPORTEST LOGGER: [TRANSACCIÓN INICIADA] Auto-Commit desactivado.");

            // ----------------------------------------------------------------
            // OPERACIÓN 1: Insertar el registro de la prueba física
            // ----------------------------------------------------------------
            String sqlRegistro = "INSERT INTO registro_pruebas (documento_aprendiz, id_prueba, fecha_realizacion, " +
                                 "resultado, observacion, id_instructor_registro) VALUES (?, ?, ?, ?, ?, ?)";
            
            // Solicitar las llaves auto-generadas (id_registro) para vincular con el plan de mejoramiento
            psRegistro = con.prepareStatement(sqlRegistro, Statement.RETURN_GENERATED_KEYS);
            psRegistro.setString(1, registro.getDocumentoAprendiz());
            psRegistro.setInt(2, registro.getIdPrueba());
            psRegistro.setDate(3, registro.getFechaRealizacion());
            psRegistro.setDouble(4, registro.getResultado());
            psRegistro.setString(5, registro.getObservacion());
            psRegistro.setInt(6, registro.getIdInstructorRegistro());
            
            psRegistro.executeUpdate();
            
            // Recuperar el ID auto-incremental de la prueba registrada
            int idRegistroGenerado = -1;
            rsClavesGeneradas = psRegistro.getGeneratedKeys();
            if (rsClavesGeneradas.next()) {
                idRegistroGenerado = rsClavesGeneradas.getInt(1);
            } else {
                throw new SQLException("Error crítico: No se pudo obtener la llave generada para el registro físico.");
            }

            // ----------------------------------------------------------------
            // CONDICIONAL TRANSACCIONAL: Si requiere Plan de Mejoramiento
            // ----------------------------------------------------------------
            if (esDeficiente) {
                System.out.println("DEPORTEST LOGGER: [ALERTA RENDIMIENTO] Generando Plan de Mejoramiento para " + registro.getDocumentoAprendiz());
                
                // OPERACIÓN 2: Insertar el plan de mejoramiento asignado
                String sqlPlan = "INSERT INTO planes_mejoramiento (id_registro_prueba, descripcion_actividades, " +
                                 "fecha_asignacion, fecha_limite, estado_plan) VALUES (?, ?, ?, ?, 'ASIGNADO')";
                
                psPlan = con.prepareStatement(sqlPlan);
                psPlan.setInt(1, idRegistroGenerado);
                psPlan.setString(2, descripcionPlan);
                psPlan.setDate(3, registro.getFechaRealizacion()); // Fecha de asignación es hoy
                psPlan.setDate(4, fechaLimite);
                psPlan.executeUpdate();

                // OPERACIÓN 3: Actualizar el estado del Aprendiz a 'PLAN_MEJORAMIENTO'
                String sqlAprendiz = "UPDATE aprendices SET estado = 'PLAN_MEJORAMIENTO' WHERE documento_identidad = ?";
                psAprendiz = con.prepareStatement(sqlAprendiz);
                psAprendiz.setString(1, registro.getDocumentoAprendiz());
                psAprendiz.executeUpdate();
            }

            // 3. ENVIAR CAMBIOS (COMMIT)
            // Si el código llegó hasta aquí sin excepciones, confirmamos permanentemente la transacción
            con.commit();
            transaccionExitosa = true;
            System.out.println("DEPORTEST LOGGER: [COMMIT EXITOSO] Todos los datos de la prueba han sido grabados y el estado actualizado.");

        } catch (SQLException ex) {
            // 4. DESHACER CAMBIOS (ROLLBACK)
            // En caso de cualquier excepción, revocamos todos los cambios hechos en esta transacción
            if (con != null) {
                try {
                    System.err.println("DEPORTEST LOGGER: [ERROR DETECTADO] Ejecutando ROLLBACK de emergencia debido a: " + ex.getMessage());
                    con.rollback();
                } catch (SQLException rollbackEx) {
                    Logger.getLogger(PruebaDAO.class.getName()).log(Level.SEVERE, "Fallo crítico al intentar hacer ROLLBACK.", rollbackEx);
                }
            }
            transaccionExitosa = false;
        } finally {
            // 5. RESTAURAR AUTO-COMMIT Y LIBERAR RECURSOS
            try {
                if (con != null) {
                    con.setAutoCommit(true); // Retornar conexión a su comportamiento por defecto
                }
                if (rsClavesGeneradas != null) rsClavesGeneradas.close();
                if (psRegistro != null) psRegistro.close();
                if (psPlan != null) psPlan.close();
                if (psAprendiz != null) psAprendiz.close();
            } catch (SQLException ex) {
                Logger.getLogger(PruebaDAO.class.getName()).log(Level.SEVERE, "Error limpiando recursos de transacción JDBC.", ex);
            }
        }
        
        return transaccionExitosa;
    }
}
