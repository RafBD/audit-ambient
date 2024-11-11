import jsPDF from 'jspdf';
import 'jspdf-autotable';

export function generateAuditPDF(currentAudit, auditResult) {
  if (!currentAudit) {
    alert('No hay auditoría disponible para exportar.');
    return;
  }

  const doc = new jsPDF();

  // Portada
  doc.setFontSize(24);
  doc.text('Informe de Auditoría Ambiental', 105, 40, { align: 'center' });
  doc.setFontSize(18);
  doc.text(`Empresa: ${currentAudit.companyName}`, 105, 60, { align: 'center' });
  doc.text(`Fecha de Auditoría: ${currentAudit.auditDate}`, 105, 70, { align: 'center' });
  doc.text(`Ubicación: ${currentAudit.location}`, 105, 80, { align: 'center' });
  doc.setFontSize(12);
  doc.text('Este informe ha sido generado automáticamente mediante nuestro sistema de auditorías.', 105, 110, { align: 'center' });

  // Salto de página después de la portada
  doc.addPage();

  // Detalles del reporte
  doc.setFontSize(16);
  doc.text('Detalles de la Auditoría', 14, 20);
  doc.setFontSize(12);
  doc.text(`Empresa: ${currentAudit.companyName}`, 14, 35);
  doc.text(`Fecha: ${currentAudit.auditDate}`, 14, 45);
  doc.text(`Ubicación: ${currentAudit.location}`, 14, 55);

  // Resultado de la auditoría
  doc.setTextColor(auditResult.passed ? 'green' : 'red');
  doc.text(auditResult.message, 14, 70);
  doc.setTextColor('black');

  // Tabla de Resultados
  let startY = 80;
  doc.autoTable({
    head: [['Parámetro', 'Valor', 'Límite', 'Resultado']],
    body: auditResult.details.map((param) => [
      param.name,
      param.value,
      param.limit,
      param.passed ? 'Cumplido' : 'No Cumplido',
    ]),
    startY: startY,
    styles: { fontSize: 10, halign: 'center' },
    headStyles: { fillColor: [22, 160, 133], textColor: 255 },
    bodyStyles: {
      fillColor: (rowIndex) => (auditResult.details[rowIndex].passed ? [144, 238, 144] : [255, 182, 193]),
    },
    didDrawPage: (data) => {
      startY = data.cursor.y + 10;  // Actualiza la posición de inicio para la siguiente página si es necesario
    }
  });

  // Verificar si se requiere una página adicional para el Resumen Ejecutivo
  if (startY + 20 > doc.internal.pageSize.height) {
    doc.addPage();
    startY = 20;
  }

  // Resumen Ejecutivo en PDF (Página separada si es necesario)
  doc.text('Resumen Ejecutivo:', 14, startY);
  doc.setFontSize(10);
  doc.text('Este informe detalla los resultados de la auditoría ambiental realizada. Los parámetros evaluados incluyen emisiones de CO2, consumo de energía, generación de residuos, y otros factores clave para la sostenibilidad ambiental de la empresa auditada.', 14, startY + 10, { maxWidth: 180 });

  // Guardar PDF
  doc.save(`informe_auditoria_${currentAudit.companyName}.pdf`);
}
