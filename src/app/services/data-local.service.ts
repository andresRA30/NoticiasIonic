import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Article } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {
  noticias: Article[] = [];
  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
    this.cargarFavoritos();
  }

  async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    const storage = await this.storage.create();
    this._storage = storage;
  }
  guardarNoticia(noticia: Article) {
    const existe = this.noticias.find(noti => noti.title === noticia.title);
    if (!existe) {
      this.noticias.unshift(noticia);
      this.storage.set('favoritos', this.noticias);
    }
  }
  async cargarFavoritos() {
    const favoritos = await this.storage.get('favoritos');
    if (favoritos) {
      this.noticias = favoritos;
    }
  }
  borrarNoticia(noticia: Article) {
    this.noticias = this.noticias.filter(noti => noti.title !== noticia.title)
    this.storage.set('favoritos', this.noticias);
  }
}
