var CHARACTERS_PER_DRAG = 10;
var User = /** @class */ (function () {
    function User(uid_, rank_, day_, server_, name_, portrait_, point_, time_, videoLink_) {
        //server : 1=Asia , 2=America 3=Europe, 4=TWHKMO
        if (server_ == undefined) {
            server_ = 1;
        }
        if (name_ == undefined) {
            name_ = "";
        }
        if (portrait_ == undefined) {
            portrait_ == "";
        }
        if (point_ == undefined) {
            point_ = 0;
        }
        if (time_ == undefined) {
            time_ = 9999;
        }
        if (videoLink_ == undefined) {
            videoLink_ = "";
        }
        this.name = name_;
        this.uid = uid_;
        this.day = day_;
        this.server = server_;
        this.portrait = portrait_;
        this.point = point_;
        this.time = time_;
        this.videoLink = videoLink_;
        this.div_slot = document.createElement("div");
        this.div_slot.className = "character_slot";
        document.getElementById("board").appendChild(this.div_slot);
        this.div_rank = document.createElement("div");
        this.div_rank.className = "rank";
        this.div_rank.innerHTML = rank_ + "";
        this.img_portrait = document.createElement("img");
        this.img_portrait.className = "portrait";
        this.div_name = document.createElement("div");
        this.div_name.className = "name";
        this.div_point = document.createElement("div");
        this.div_point.className = "point";
        this.div_time = document.createElement("div");
        this.div_time.className = "time";
        this.img_link = document.createElement("img");
        this.img_link.className = "video-link";
        this.img_link.src = "./images/youtube.png";
        this.div_slot.appendChild(this.div_rank);
        this.div_slot.appendChild(this.img_portrait);
        this.div_slot.appendChild(this.div_name);
        this.div_slot.appendChild(this.div_point);
        this.div_slot.appendChild(this.div_time);
        this.div_slot.appendChild(this.img_link);
        this.load_data();
        this.makeSlot();
    }
    User.prototype.load_data = function () {
        var _this = this;
        var Userdata = new XMLHttpRequest();
        Userdata.onreadystatechange = function () {
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
            if (Userdata.readyState == XMLHttpRequest.DONE) {
                var data = JSON.parse(Userdata.responseText);
                _this.portrait = data["portrait"];
                _this.name = data["name"];
                _this.point = data["point"];
                _this.time = data["time"];
                _this.videoLink = data["videolink"];
                _this.img_portrait.src = "./images/portraits/" + _this.portrait + ".png";
                _this.div_name.innerHTML = _this.name;
                _this.div_point.innerHTML = _this.point + "";
                _this.div_time.innerHTML = timeFormat(_this.time);
                if (_this.videoLink == "null" || _this.videoLink == null || _this.videoLink == "") {
                    _this.img_link.style.display = "none";
                }
            }
        };
        Userdata.open("GET", "./getData.php?server=" + this.server + "&uid=" + this.uid + "&day=" + this.day, true);
        Userdata.send();
    };
    User.prototype.makeSlot = function () {
        var _this = this;
        this.img_portrait.src = "./images/portraits/" + this.portrait + ".png";
        this.div_name.innerHTML = this.name;
        this.div_point.innerHTML = this.point + "";
        this.div_time.innerHTML = timeFormat(this.time);
        this.img_link.onclick = function () {
            window.open(_this.videoLink, "_blank");
        };
        this.div_slot.style.display = "block";
    };
    return User;
}());
function timeFormat(sec_) {
    var min = Math.floor(sec_ / 60);
    if (min > 59) {
        min = 59;
    }
    return min + ":" + (sec_ % 60);
}
