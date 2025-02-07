import { Injectable } from '@angular/core';
import { saveAs } from 'file-saver';
import { BaseHttpService } from './base-http.service';

@Injectable({
  providedIn: 'root',
})
export class PdfService extends BaseHttpService {
  downloadPdfBoleta(comprobanteId: number): void {
    this.http
      .get(`${this.apiUrl}/comprobantes/boleta/${comprobanteId}`, { responseType: 'blob' })
      .subscribe((response) => {
        const blob = new Blob([response], { type: 'application/pdf' });
        saveAs(blob, `comprobante-${comprobanteId}.pdf`);
      });
  }

  downloadPdfFactura(comprobanteId: number): void {
    this.http
      .get(`${this.apiUrl}/comprobantes/factura/${comprobanteId}`, { responseType: 'blob' })
      .subscribe((response) => {
        const blob = new Blob([response], { type: 'application/pdf' });
        saveAs(blob, `comprobante-${comprobanteId}.pdf`);
      });
  }
}
