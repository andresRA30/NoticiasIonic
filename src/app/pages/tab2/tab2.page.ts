import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll, IonSegment } from '@ionic/angular';
import { NoticiasService } from 'src/app/services/noticias.service';
import { Article } from '../../interfaces/interfaces';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements AfterViewInit {
  @ViewChild(IonSegment) segment: IonSegment;
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  categorias = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'];
  noticias: Article[] = [];
  categoria: string;

  constructor(private noticiasService: NoticiasService) { }

  ngAfterViewInit(): void {
    this.segment.value = this.categorias[0];
    this.cargarNoticias(this.segment.value);
  }


  cambioCategoria(event) {

    this.infiniteScroll.disabled = false;
    this.noticiasService.headlinesPage = 0;
    this.noticias = [];

    this.categoria = event.detail.value;
    this.cargarNoticias(event.detail.value);

  }
  loadData(event) {
    this.cargarNoticias(this.categoria, event);
  }
  cargarNoticias(categoria: string, event?) {

    this.noticiasService.getTopHeadLinesCategoria(categoria)
      .subscribe(resp => {
        if (resp.articles.length === 0) {
          event.target.disabled = true;
          event.target.complete();
          return;
        }
        this.noticias.push(...resp.articles);
        if (event) {
          event.target.complete();
        }
      })
  }

}
