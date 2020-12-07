const CHARACTERS_PER_DRAG:number=10;



class User{

    name:string;
    uid:number;
    server:number;
    point:number;
    time:number;
    day:number;

    portrait:string;
    videoLink:string|null;

    div_slot:HTMLDivElement;

    div_rank:HTMLDivElement;
    img_portrait:HTMLImageElement;
    div_name:HTMLDivElement;
    div_point:HTMLDivElement;
    div_time:HTMLDivElement;
    img_link:HTMLImageElement;

    constructor(uid_:number,rank_:number,day_:number,server_?:number,name_?:string,portrait_?:string,point_?:number,time_?:number,videoLink_?:string) {
        
        //server : 1=Asia , 2=America 3=Europe, 4=TWHKMO
        if(server_==undefined){
            server_=1;
        }
        if(name_==undefined){
            name_="";
        }
        if(portrait_==undefined){
            portrait_=="";
        }
        if(point_==undefined){
            point_=0;
        }
        if(time_==undefined){
            time_=9999;
        }
        if(videoLink_==undefined){
            videoLink_="";
        }
        this.name=name_;
        this.uid=uid_;
        this.day=day_;
        this.server=server_;
        this.portrait=portrait_;
        this.point=point_;
        this.time=time_;
        this.videoLink=videoLink_;

        this.div_slot=document.createElement("div");
        this.div_slot.className="character_slot";
        document.getElementById("board").appendChild(this.div_slot);

        this.div_rank=document.createElement("div");
        this.div_rank.className="rank";
        this.div_rank.innerHTML=rank_+"";
        this.img_portrait=document.createElement("img");
        this.img_portrait.className="portrait";
        this.div_name=document.createElement("div");
        this.div_name.className="name";
        this.div_point=document.createElement("div");
        this.div_point.className="point";
        this.div_time=document.createElement("div");
        this.div_time.className="time";
        this.img_link=document.createElement("img");
        this.img_link.className="video-link";
        this.img_link.src="./images/youtube.png";

        this.div_slot.appendChild(this.div_rank);
        this.div_slot.appendChild(this.img_portrait);
        this.div_slot.appendChild(this.div_name);
        this.div_slot.appendChild(this.div_point);
        this.div_slot.appendChild(this.div_time);
        this.div_slot.appendChild(this.img_link);

        this.load_data();
        this.makeSlot();
    }

    load_data(){

        var Userdata:XMLHttpRequest =new XMLHttpRequest();
        Userdata.onreadystatechange=()=>{
            /*
            data{
                name,
                server,
                uid,
                point,
                time,
                portrait,
                videolink
            }
            */
            if (Userdata.readyState == XMLHttpRequest.DONE){
                var data=JSON.parse(Userdata.responseText);
                this.portrait=data["portrait"];
                
                this.name=data["name"];
                this.point=data["point"];
                this.time=data["time"];
                this.videoLink=data["videolink"];
                

                this.img_portrait.src="./images/portraits/"+this.portrait+".png";
                this.div_name.innerHTML=this.name;
                this.div_point.innerHTML=this.point+"";
                this.div_time.innerHTML=timeFormat(this.time);

                
                if(this.videoLink=="null" || this.videoLink==null || this.videoLink==""){
                    this.img_link.style.display="none";
                }
            }      
        }
        Userdata.open("GET","./getData.php?server="+this.server+"&uid="+this.uid+"&day="+this.day,true);
        Userdata.send();
    }
    makeSlot(){
        
        this.img_portrait.src="./images/portraits/"+this.portrait+".png";

        this.div_name.innerHTML=this.name;
        
        this.div_point.innerHTML=this.point+"";

        this.div_time.innerHTML=timeFormat(this.time);

        this.img_link.onclick=()=>{
            window.open(this.videoLink,"_blank");
        }

        this.div_slot.style.display="block";
    }
}



function timeFormat(sec_:number){
    let min:number=Math.floor(sec_/60);
    if(min>59){min=59}
    return min+":"+(sec_%60);
}