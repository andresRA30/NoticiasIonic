import { Component, OnInit, Input } from '@angular/core';
import { Article } from '../../interfaces/interfaces';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ActionSheetController, ToastController } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { DataLocalService } from '../../services/data-local.service';

@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.scss'],
})
export class NoticiaComponent implements OnInit {
  @Input() noticia: Article;
  @Input() i: number;
  @Input() enFavoritos;

  constructor(private iab: InAppBrowser,
    private actionSheetCtrl: ActionSheetController,
    private socialSharing: SocialSharing,
    private dataLocal: DataLocalService,
    public toastController: ToastController) { }

  ngOnInit() {

  }
  abrirNoticia() {

    const browser = this.iab.create(this.noticia.url, '_system');

  }
  async lanzarMenu() {
    let guardarBorrarBtn;
    if (this.enFavoritos) {
      guardarBorrarBtn = {
        text: 'Borrar Favorito',
        icon: 'trash',
        cssClass: 'action-dark',
        handler: () => {
          this.BorrarFavoritosToast();

          this.dataLocal.borrarNoticia(this.noticia)
        }
      }
    } else {
      guardarBorrarBtn = {
        text: 'Favorito',
        icon: 'star',
        cssClass: 'action-dark',
        handler: () => {
          this.GuardarFavoritosToast();
          this.dataLocal.guardarNoticia(this.noticia)
        }
      }
    }
    const actionSheet = await this.actionSheetCtrl.create({
      buttons: [{
        text: 'Compartir',
        icon: 'share-social',
        cssClass: 'action-dark',
        handler: () => {

          this.socialSharing.share(
            this.noticia.title,
            this.noticia.source.name,
            '',
            this.noticia.url
          )
        }
      },
        guardarBorrarBtn,
      {
        text: 'Cancelar',
        icon: 'close',

        cssClass: 'action-dark',
        handler: () => {

        }
      }]
    });
    await actionSheet.present();
  }
  async GuardarFavoritosToast() {
    const toast = await this.toastController.create({
      message: 'Notica Guardada en favoritos!',
      duration: 1500
    });
    toast.present();
  }
  async BorrarFavoritosToast() {
    const toast = await this.toastController.create({
      message: 'Se ha borrado de favoritos!',
      duration: 1500
    });
    toast.present();
  }
}
