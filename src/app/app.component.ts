import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component( {
  selector: 'app-root',
  template: `
      <!-- 
      <button (click)="showNextImage()">  Next  </button>
      <button (click)="showPrevImage()">  Prev  </button>
      -->
      <input type="checkbox" name="rotation" (change)="toRotation($event)">
      <label for="">Allow rotation</label><br>     
      <button id="removeAll" (click)="removeAll() ">Remove all Countries</button>
     
       <br>
       <hr>

      <div class="flip-card enableflip" *ngFor="let countrie of allCountries">
      <div class="flip-card-inner">
      <div class="flip-card-front">
      <img id="img" src="{{countrie.flags.png }}"style="width:150;height:150px;">
     </div>
    <div class="flip-card-back ">
      <h2>{{countrie.name.common}}</h2> 
      <p>population:</p>
      <h4>{{countrie.population}}</h4>
      <button (click)="removeThisCountrie()">Remove this countrie</button>
    </div>
  </div>
</div>

  `,
  styles: [ `
  label{
    color:red;
  }
      img
      {
            width:150px;
      } 

body {
  font-family: Arial, Helvetica, sans-serif;
}

.flip-card {
  background-color: transparent;
  width: 150px;
  height: 150px;
  perspective: 1000px;
  display:inline-block;
  margin:5px;
  border:solid 2px green;
  border-radius:5px;
  cursor:pointer;
}

.flip-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.6s;
  transform-style: preserve-3d;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
}

.flip-card.enableflip:hover .flip-card-inner {
  transform: rotateY(180deg);
}

.flip-card-front, .flip-card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
}

.flip-card-front {
  background-color: #bbb;
  color: black;
}

.flip-card-back {
  background-color: #2980b9;
  color: white;
  transform: rotateY(180deg);
}
  `]
} )
export class AppComponent {
  [ x: string ]: any;
  removeAll() {
    this.allCountries = []
  }
  removeThisCountrie() {
   this.allCountries[] 
  }

  toRotation(x:Event) {
    const allCards=document.getElementsByClassName("flip-card");
    debugger
    for (let i = 0; i < allCards.length; i++) {
      const card = allCards[i];
      if (x) {
        card.className="flip-card";
      }else{
        card.className="flip-card enableflip";
      }
    }

  }
  showNextImage() {
    if ( this.imageIndex < this.allCountries.length ) {

      this.imageIndex++;
    }
  }
  showPrevImage() {
    if ( this.imageIndex > 0 ) {
      this.imageIndex--;

    }
  }

  imageIndex = 1;
  allCountries: any;
  constructor ( httpService: HttpClient ) {
    httpService.get( "https://restcountries.com/v3.1/all" )
      .subscribe( countriesFromServer => {
        this.allCountries = countriesFromServer;
      } );
  }
}
