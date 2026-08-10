/**
 * ==========================================================================
 * VALIDACIONES.JS - Módulo reutilizable de validación de datos
 * ==========================================================================
 */

/**
 * Verifica si un campo de texto está vacío o solo contiene espacios.
 */
export function campoVacio(valor: string) {
    return !valor || valor.trim() === '';
}

/**
 * Valida que un texto contenga únicamente letras (incluyendo tildes y ñ).
 */
export function soloLetras(texto: string) {
    return /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/.test(texto.trim());
}

/**
 * Valida que un texto contenga únicamente dígitos (0-9).
 */
export function soloNumeros(texto: string) {
    return /^\d+$/.test(texto.trim());
}

/**
 * Sanitiza un texto para prevenir ataques XSS e inyección SQL.
 */
export function sanitizar(texto: string) {
    if (!texto) return '';
    let limpio = texto.replace(/[<>"'%;()&+]/g, '').trim();
    limpio = limpio.replace(/\b(SELECT|INSERT|UPDATE|DELETE|DROP|TRUNCATE|ALTER|CREATE|FROM|WHERE)\b/gi, '');
    return limpio.trim();
}

/**
 * Valida que un campo de texto tenga al menos una longitud mínima de caracteres.
 */
export function longitudMinima(texto: string, min: number) {
    return texto.trim().length >= min;
}

/**
 * Verifica que un valor numérico sea válido y mayor a cero.
 */
export function numeroPositivo(valor: string | number) {
    const num = typeof valor === 'string' ? parseInt(valor) : valor;
    return !isNaN(num) && num > 0;
}

/**
 * Valida el formato básico de un texto
 */
export function formatoTexto(texto: string) {
    return texto === texto.trim() && texto.length > 0;
}
