import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_auth/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public lat;
  public lng;
  public userName:string;
  isUser:Boolean=false;

  public markers: any[];
  public zoom: number;
  ShowMap:boolean=false;
  position: { lat: any; lng: any; };
  selBus="1234";
  constructor( private authService: AuthService) {
    this.userName=this.authService.userName;
    if(this.userName.includes("user"))
    this.isUser=true;
    else
    this.isUser=false;
    if(!this.isUser)
    {
    this.getLocation();
    this.authService.SaveLocation(this.selBus,this.lat,this.lng);
    }
    else
    {
    this.authService.GetLocation(this.selBus);

    }

   }

  ngOnInit() {
    //this.getLocation();
  }
  loadMap()
  {
    this.ShowMap=true;
    //this.selBus=value;
    this.getLocation();
  }
  getLocation() {
    if (navigator.geolocation) {
      var that=this;
      navigator.geolocation.getCurrentPosition((position: any) => {
        if (position) {
          console.log("Latitude: " + position.coords.latitude +
            "Longitude: " + position.coords.longitude);
          this.lat = position.coords.latitude;
          this.lng = position.coords.longitude;
          this.position= {
                 lat:position.coords.latitude,
                 lng: position.coords.longitude,
               };
         
          // that.markers.push({
          //   position: {
          //     lat:position.coords.latitude,
          //     lng: position.coords.longitude,
          //   },
          //   label: {
          //     color: "black",
          //     text: "Current Location"
          //   }
          // });
      
        }
      },
        (error: any) => console.log(error));
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

}
