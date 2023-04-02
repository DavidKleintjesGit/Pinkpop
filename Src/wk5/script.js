  function selectRow(elem) {
    var elements = document.querySelectorAll(".selected");

    elements.forEach((element) => {
      element.classList.remove("selected");
    });
    elem.classList.add("selected");
  }
  
  function accordion(elem) {
    var panel = elem.nextElementSibling;
    elem.classList.toggle("active");
    panel.style.display = panel.style.display === "block" ? "none" : "block";
  }

  function addItem(product, quantity, cost) {
    var newItem = { 'productName': product, 'quantity': quantity, 'cost': cost };
    var shoppingCart = JSON.parse(sessionStorage.getItem("cart")) || [];
  
    var inCart = false;
    for (var index = 0; index < shoppingCart.length; index++) {
      if (shoppingCart[index].productName === newItem.productName) {
        shoppingCart[index].quantity += 1;
        inCart = true;
        break;
      }
    }
    if (!inCart) {
      shoppingCart.push(newItem);
    }
  
    sessionStorage.setItem("cart", JSON.stringify(shoppingCart));
    showCart();
  }
  
  function emptyCart() {
    sessionStorage.removeItem("cart");
    showCart();
  }
  
  function showCart() {
    var orderList = document.getElementById("bestelling");
    orderList.innerHTML = "";
  
    var cartItems = JSON.parse(sessionStorage.getItem("cart"));
    var totalPrice = 0;
  
    if (cartItems && cartItems.length > 0) {
      for (var i = 0; i < cartItems.length; i++) {
        var item = cartItems[i];
        var listItem = document.createElement("li");
        listItem.textContent = item.productName + " x" + item.quantity + " " + item.cost;
        orderList.appendChild(listItem);
  
        totalPrice += item.quantity * item.cost;
      }
  
      var discount = totalPrice * 0.10
      var discountPrice = (totalPrice - discount);
  
      var totalItem = document.createElement("li");
      totalItem.textContent = "Totale prijs: €" + totalPrice.toFixed(2);
      orderList.appendChild(totalItem);
      var discountItem = document.createElement("li");
      discountItem.textContent = "Prijs met 10% (€" +  discount + ") vroegtijdskorting: €" + discountPrice.toFixed(2);
      orderList.appendChild(discountItem);
  
    } else {
      orderList.textContent = "Winkelwagen leeg.";
    }
  }

  function fetchAlbums() {    
    const request = new XMLHttpRequest();
    request.open('GET', 'jukebox.json', true);
    request.responseType = 'json';
    request.send();
    request.onload = function() {
        const albums = request.response;
        fillAlbumList(albums);
    };
    }
    
    function fillAlbumList(albums) {
        let options = "<option value=''>Selecteer een album</option>";
        for (const album in albums) {
            const albumObj = albums[album];
            options += `<option value=${albumObj.id}>${albumObj.title} ${calculateAlbumDuration(albumObj)}</option>`;
        }
        document.getElementById("albumList").innerHTML = options;
    }
    
    function updateSongList() {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'jukebox.json', true);
        xhr.responseType = 'json';
        xhr.send();
        xhr.onload = function() {
        var albumData = xhr.response;
        var chosenAlbum = document.getElementById("albumList").value;
    
        var songOptions = "<option value=''>Selecteer een liedje</option>";
        for (var album in albumData) {
        var currentAlbum = albumData[album];
        if (chosenAlbum == currentAlbum.id) {
            for (var j = 0; j < currentAlbum.tracks.length; j++) {
                var track = currentAlbum.tracks[j];
                songOptions += "<option value=" + track["url"] + ">" + track["title"] + " " + calculateSongDuration(currentAlbum)[j] + "</option>";
            }
        }
        }
        document.getElementById("songList").innerHTML = songOptions;
        };  
    }
    
    function playSong() {
      const selectedSong = document.getElementById("songList").value;
      const videoHtml = `<source src="videos/${selectedSong}" type="video/mp4">`;
      const videoElement = document.getElementById("musicBox");
    
      videoElement.innerHTML = videoHtml;
      videoElement.load();
    }
    
    function calculateSongDuration(album) {
        return album.tracks.map(track => track.duration);
    }
    
    function calculateAlbumDuration(album) {
    var tracks = album.tracks;
    var totalTime = 0;
    
    for (var i = 0; i < tracks.length; i++) {
        var trackDuration = tracks[i].duration;
        var timeParts = trackDuration.split(":");
        var minutes = parseInt(timeParts[0]);
        var seconds = parseInt(timeParts[1]);
    
        totalTime += (minutes * 60) + seconds;
    }
    
    var durationInMinutes = Math.floor(totalTime / 60);
    var remainingSeconds = totalTime % 60;
    
    if (remainingSeconds < 10) {
        remainingSeconds = "0" + remainingSeconds;
    }
    
    return durationInMinutes + ":" + remainingSeconds;
    }
  
  
  