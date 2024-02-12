export default class CanvasExporter {
  canvas: HTMLCanvasElement | null = null;

  setCanvas(context: HTMLCanvasElement) {
    this.canvas = context;
  }

  download() {
    if (!this.canvas) {
      throw new Error('Canvas context is not set');
    }

    const canvas = this.canvas;
    const dataUrl = canvas.toDataURL('image/png');
    const a = document.createElement('a');

    a.href = dataUrl;
    a.download = 'avatar.png';
    a.click();
  }

  async exportBlob() {
    if (!this.canvas) {
      throw new Error('Canvas context is not set');
    }

    return new Promise<Blob>((resolve) => {
      this.canvas!.toBlob((blob) => {
        resolve(blob!);
      });
    });
  }
}
