export interface Producto {
  id: string; // Para identificarlo de forma única
  nombre: string;
  tipo: 'impresion' | 'vinilo' | 'otro'; // Puedes expandir esto
  descripcion?: string; // Opcional, para más detalles
  unidadMedida: 'm2' | 'unidad' | 'ml' | 'string'; // m², unidad, metro lineal, etc.
  costoBase: number; // Costo por unidad de medida
  requiereMedidas?: boolean; // Por ejemplo, si es una impresión que necesita ancho y alto
  // Podrías añadir más propiedades aquí para acabados, materiales, etc.
}