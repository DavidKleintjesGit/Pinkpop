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
  
  