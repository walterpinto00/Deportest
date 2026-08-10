package sena.deportest.conexion;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 * CLASE: ClsConexion
 * PATRÓN DE DISEÑO: Singleton (Instancia Única)
 * DESCRIPCIÓN: Administra de forma centralizada y segura el ciclo de vida de la 
 *              conexión JDBC hacia el motor de base de datos MySQL o PostgreSQL.
 * ARQUITECTURA: Capa de Datos (Modelo-Vista-Controlador - MVC)
 * 
 * Normas de Calidad Aplicadas: Clean Code, manejo adecuado de excepciones (SQLException),
 * cierre defensivo de recursos y protección de parámetros de conexión.
 * 
 * @author Instructor Técnico & Arquitecto de Software Senior
 * @version 1.0 (DEPORTEST)
 */
public class ClsConexion {

    // Instancia única privada de la clase (Patrón Singleton)
    private static ClsConexion instancia = null;
    
    // Objeto de conexión nativo de Java SQL
    private Connection conexion = null;

    // Constantes de Configuración de Base de Datos (Seguridad: Deben parametrizarse en un archivo .properties o variables de entorno)
    private static final String MOTOR = "postgresql"; // Opciones: "postgresql" o "mysql"
    private static final String HOST = "localhost";
    private static final String PUERTO = "5432"; // 5432 para PostgreSQL, 3306 para MySQL
    private static final String DB_NAME = "deportest_db";
    private static final String USUARIO = "postgres"; // Cambiar según configuración del servidor
    private static final String CONTRASENA = "admin123"; // Reemplazar con credenciales seguras de producción

    // Constructor privado para impedir instanciación externa redundante (Regla estricta del Singleton)
    private ClsConexion() {
        inicializarConexion();
    }

    /**
     * Inicializa la conexión cargando el Driver correspondiente y estableciendo el enlace.
     */
    private void inicializarConexion() {
        try {
            String urlConexion = "";
            
            if (MOTOR.equalsIgnoreCase("postgresql")) {
                // Registrar el Driver JDBC de PostgreSQL de manera explícita
                Class.forName("org.postgresql.Driver");
                urlConexion = "jdbc:postgresql://" + HOST + ":" + PUERTO + "/" + DB_NAME;
            } else if (MOTOR.equalsIgnoreCase("mysql")) {
                // Registrar el Driver JDBC de MySQL
                Class.forName("com.mysql.cj.jdbc.Driver");
                urlConexion = "jdbc:mysql://" + HOST + ":" + PUERTO + "/" + DB_NAME + "?useSSL=false&serverTimezone=UTC";
            } else {
                throw new ClassNotFoundException("Motor de base de datos no soportado: " + MOTOR);
            }

            // Establecer la conexión con el motor seleccionado
            this.conexion = DriverManager.getConnection(urlConexion, USUARIO, CONTRASENA);
            System.out.println("DEPORTEST LOGGER: [ÉXITO] Conexión establecida satisfactoriamente con " + MOTOR.toUpperCase() + ".");
            
        } catch (ClassNotFoundException ex) {
            Logger.getLogger(ClsConexion.class.getName()).log(Level.SEVERE, "Driver de Base de Datos no encontrado en el Classpath.", ex);
        } catch (SQLException ex) {
            Logger.getLogger(ClsConexion.class.getName()).log(Level.SEVERE, "Error al conectar con la base de datos: " + ex.getMessage(), ex);
        }
    }

    /**
     * Punto de acceso global para obtener la instancia única del Singleton.
     * Hilo-seguro (synchronized) para entornos concurrentes multitarea.
     * 
     * @return ClsConexion Instancia única de conexión.
     */
    public static synchronized ClsConexion getInstancia() {
        try {
            // Si la instancia no existe o la conexión física se ha cerrado, se recrea
            if (instancia == null || instancia.getConexion() == null || instancia.getConexion().isClosed()) {
                instancia = new ClsConexion();
            }
        } catch (SQLException ex) {
            Logger.getLogger(ClsConexion.class.getName()).log(Level.SEVERE, "Error validando el estado de la conexión.", ex);
            instancia = new ClsConexion(); // Re-intentar inicialización defensiva
        }
        return instancia;
    }

    /**
     * Obtiene el objeto Connection listo para ser usado en transacciones y consultas preparadas.
     * 
     * @return Connection Conexión SQL activa.
     */
    public Connection getConexion() {
        return this.conexion;
    }

    /**
     * Cierra de manera segura la conexión actual si está abierta.
     * Previene fugas de conexiones (connection leaks) en el pool del servidor de aplicaciones.
     */
    public void cerrarConexion() {
        if (this.conexion != null) {
            try {
                if (!this.conexion.isClosed()) {
                    this.conexion.close();
                    System.out.println("DEPORTEST LOGGER: [CONEXIÓN CERRADA] Recursos JDBC liberados correctamente.");
                }
            } catch (SQLException ex) {
                Logger.getLogger(ClsConexion.class.getName()).log(Level.SEVERE, "Error al intentar cerrar la conexión JDBC.", ex);
            }
        }
    }
}
