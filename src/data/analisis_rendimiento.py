# -*- coding: utf-8 -*-
"""
MÓDULO: analisis_rendimiento.py
AUTOR: Instructor Técnico & Arquitecto de Software Senior
DESCRIPCIÓN: Script para el análisis de rendimiento físico de aprendices, 
             generación de estadísticas descriptivas y graficación automatizada.
TECNOLOGÍAS: Python (Pandas, NumPy, Matplotlib, Seaborn)
SISTEMA: DEPORTEST - Gestión de Rendimiento Deportivo SENA
============================================================================
"""

import sys
import os
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

# Intentar importar Seaborn para mejorar la estética visual de los gráficos
try:
    import seaborn as sns
    sns.set_theme(style="whitegrid")
    HAS_SEABORN = True
except ImportError:
    HAS_SEABORN = False


def cargar_datos_ejemplo():
    """
    Simula la extracción de registros de la base de datos relacional para su análisis.
    Representa una vista desnormalizada (JOIN) de la tabla 'registro_pruebas' y 'aprendices'.
    """
    data = {
        'documento': ['1012345678', '1012345678', '1023456789', '1023456789', '1034567890', '1045678901', '1056789012'],
        'nombre_aprendiz': ['Carlos Gomez', 'Carlos Gomez', 'Laura Perez', 'Laura Perez', 'Mateo Rodriguez', 'Valentina Tobón', 'Andrés Castro'],
        'genero': ['M', 'M', 'F', 'F', 'M', 'F', 'M'],
        'prueba': ['Test de Cooper', 'Test de Cooper', 'Test de Cooper', 'Sprint 50m', 'Flexiones de Pecho', 'Abdominales', 'Flexiones de Pecho'],
        'resultado': [2100.0, 2450.0, 1900.0, 8.45, 42.0, 35.0, 48.0],
        'fecha': ['2026-04-15', '2026-06-20', '2026-06-20', '2026-06-22', '2026-06-18', '2026-06-19', '2026-06-25'],
        'categoria': ['RESISTENCIA', 'RESISTENCIA', 'RESISTENCIA', 'VELOCIDAD', 'FUERZA', 'FUERZA', 'FUERZA']
    }
    return pd.DataFrame(data)


def calcular_estadisticas_descriptivas(df):
    """
    Aplica lógica matemática para calcular resúmenes estadísticos agrupados por prueba y género.
    
    Estándar Estadístico Aplicado:
    - Media (Aritmética)
    - Mediana (Puntaje central)
    - Desviación Estándar (Dispersión)
    - Mínimos y Máximos
    """
    print("\n" + "="*80)
    print(" DEPORTEST: INFORME DE ANÁLISIS ESTADÍSTICO DE PRUEBAS")
    print("="*80)
    
    # Filtrar solo pruebas de resistencia para comparar
    df_resistencia = df[df['categoria'] == 'RESISTENCIA']
    
    if not df_resistencia.empty:
        print("\n--- Estadísticas Descriptivas para Pruebas de RESISTENCIA (en metros) ---")
        resumen = df_resistencia.groupby('genero')['resultado'].agg(['count', 'mean', 'median', 'std', 'min', 'max'])
        # Reemplazar NaN en desviación estándar (ocurre cuando count = 1) por 0.0
        resumen['std'] = resumen['std'].fillna(0.0)
        print(resumen.round(2).to_string())
    
    # Agrupación general
    print("\n--- Promedio de Resultados Generales por Tipo de Prueba ---")
    promedios = df.groupby('prueba')['resultado'].mean()
    print(promedios.round(2).to_string())


def evaluar_nivel_rendimiento(prueba, resultado, genero):
    """
    Función algorítmica de clasificación de rendimiento bajo estándares deportivos adaptados.
    
    @param prueba: str Nombre de la prueba.
    @param resultado: float Valor numérico obtenido.
    @param genero: str 'M' (Masculino) o 'F' (Femenino).
    @return: dict Nivel de rendimiento ('EXCELENTE', 'BUENO', 'ACEPTABLE', 'DEFICIENTE') y recomendación.
    """
    if 'Cooper' in prueba:
        # Baremos simplificados de Cooper (Resistencia Aeróbica en metros para jóvenes de 17-20 años)
        if genero == 'M':
            if resultado >= 2700: return {'nivel': 'EXCELENTE', 'accion': 'Mantener plan de alto rendimiento.'}
            elif resultado >= 2400: return {'nivel': 'BUENO', 'accion': 'Adecuada capacidad aeróbica.'}
            elif resultado >= 2100: return {'nivel': 'ACEPTABLE', 'accion': 'Establecer plan preventivo de cardio.'}
            else: return {'nivel': 'DEFICIENTE', 'accion': 'Asignación inmediata de Plan de Mejoramiento (HIIT).'}
        else: # Femenino
            if resultado >= 2200: return {'nivel': 'EXCELENTE', 'accion': 'Mantener plan de alto rendimiento.'}
            elif resultado >= 1950: return {'nivel': 'BUENO', 'accion': 'Adecuada capacidad aeróbica.'}
            elif resultado >= 1800: return {'nivel': 'ACEPTABLE', 'accion': 'Establecer plan preventivo de cardio.'}
            else: return {'nivel': 'DEFICIENTE', 'accion': 'Asignación inmediata de Plan de Mejoramiento (HIIT).'}
            
    elif 'Flexiones' in prueba:
        # Repeticiones en 1 min
        if resultado >= 45: return {'nivel': 'EXCELENTE', 'accion': 'Excelente fuerza de empuje.'}
        elif resultado >= 30: return {'nivel': 'BUENO', 'accion': 'Fuerza dentro de la norma.'}
        elif resultado >= 20: return {'nivel': 'ACEPTABLE', 'accion': 'Rutinas de tonificación muscular.'}
        else: return {'nivel': 'DEFICIENTE', 'accion': 'Asignar plan de fuerza progresiva para tren superior.'}
        
    # Clasificación por defecto para otras pruebas
    return {'nivel': 'BUENO', 'accion': 'Seguimiento estándar programado.'}


def generar_graficos_rendimiento(df, ruta_salida='grafico_rendimiento.png'):
    """
    Genera y guarda un gráfico descriptivo comparativo para Bienestar Institucional.
    Usa matplotlib y seaborn para garantizar gráficos profesionales.
    """
    df_resistencia = df[df['prueba'] == 'Test de Cooper'].copy()
    if df_resistencia.empty:
        print("[AVISO] No hay datos de resistencia suficientes para generar el gráfico.")
        return
        
    # Convertir columna fecha a datetime para ordenar cronológicamente
    df_resistencia['fecha'] = pd.to_datetime(df_resistencia['fecha'])
    df_resistencia = df_resistencia.sort_values(by='fecha')
    
    # Crear figura y ejes
    fig, ax = plt.subplots(figsize=(10, 6))
    
    # Estilo de graficación
    if HAS_SEABORN:
        sns.lineplot(
            data=df_resistencia, 
            x='fecha', 
            y='resultado', 
            hue='nombre_aprendiz', 
            marker='o', 
            linewidth=2.5, 
            markersize=8,
            ax=ax
        )
    else:
        for aprendiz, sub_df in df_resistencia.groupby('nombre_aprendiz'):
            ax.plot(sub_df['fecha'], sub_df['resultado'], marker='o', label=aprendiz, linewidth=2)
            
    ax.set_title('Evolución Histórica de Rendimiento - Test de Cooper (12 Minutos)', fontsize=14, fontweight='bold', pad=15)
    ax.set_xlabel('Fecha de la Evaluación', fontsize=12, labelpad=10)
    ax.set_ylabel('Distancia Recorrida (Metros)', fontsize=12, labelpad=10)
    ax.legend(title='Aprendiz Evaluado', title_fontsize='11', loc='lower right')
    
    # Añadir líneas de referencia de baremos generales
    ax.axhline(y=2400, color='g', linestyle='--', alpha=0.6, label='Baremos: Bueno (M)')
    ax.axhline(y=1800, color='r', linestyle='--', alpha=0.6, label='Baremos: Deficiente')
    
    plt.tight_layout()
    
    # Guardar gráfico en disco de manera segura
    try:
        plt.savefig(ruta_salida, dpi=300)
        print(f"\n[ÉXITO] Gráfico de rendimiento exportado correctamente en: '{ruta_salida}'")
    except Exception as e:
        print(f"[ERROR] No se pudo guardar el gráfico en disco: {e}")
    finally:
        plt.close()


def ejecutar_analisis_principal():
    """
    Ejecutor principal del script matemático.
    """
    # 1. Carga de datos
    df = cargar_datos_ejemplo()
    
    # 2. Análisis matemático de estadísticas descriptivas
    calcular_estadisticas_descriptivas(df)
    
    # 3. Aplicar algoritmo de evaluación sobre cada registro
    print("\n" + "="*80)
    print(" CLASIFICACIÓN INDIVIDUAL DE RENDIMIENTO ATLETICA")
    print("="*80)
    for index, fila in df.iterrows():
        evaluacion = evaluar_nivel_rendimiento(fila['prueba'], fila['resultado'], fila['genero'])
        print(f"Aprendiz: {fila['nombre_aprendiz']:18} | Prueba: {fila['prueba']:20} | Resultado: {fila['resultado']:7} {evaluacion['nivel']:10} -> Acción: {evaluacion['accion']}")
        
    # 4. Graficación y renderizado
    generar_graficos_rendimiento(df)


if __name__ == '__main__':
    # Ejecutar el script
    ejecutar_analisis_principal()
