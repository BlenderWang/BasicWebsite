// to make sure the page content is done loading
if(document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
}else {
    ready()
}

function ready() {
    // create a remove event
    const removeCartItemBtn = document.getElementsByClassName('btn-danger')
    for(let i = 0; i < removeCartItemBtn.length; i++) {
        const btn = removeCartItemBtn[i]
        btn.addEventListener('click', removeCartItem)
    }

    // to change the qty input
    const quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for(let i = 0; i < quantityInputs.length; i++) {
        const input = quantityInputs[i]
        input.addEventListener('change', quantityChange)
    }

    // add to cart action
    const addToCartBtn = document.getElementsByClassName('shop-item-btn')
    for(let i = 0; i < addToCartBtn.length; i++) {
        const btn = addToCartBtn[i]
        btn.addEventListener('click', addToCartClicked)
    }

    // purchase fn
    document.querySelector('.btn-purchase').addEventListener('click', purchaseClicked)
}

function purchaseClicked() {
    alert('Thank you for your purchase!')
    const cartItems = document.querySelector('.cart-items')
    while(cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal()
}

function addToCartClicked(e) {
    const btn = e. target
    const shopItem = btn.parentElement.parentElement
    const title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
    const price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
    const imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src
    // console.log(title, price, imageSrc);
    addItemToCart(title, price, imageSrc)
    updateCartTotal()
}

function addItemToCart(title, price, imageSrc) {
    const cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    const cartItems = document.getElementsByClassName('cart-items')[0]
    // make sure there's no duplicate of items
    const cartItemNames = cartItems.getElementsByClassName('cart-item-title')
    for(let i = 0; i < cartItemNames.length; i++) {
        if(cartItemNames[i].innerText == title) {
            alert('This item is already added to the cart')
            return
        }
    }
    // to create a cart row content
    const cartRowContents = `
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${imageSrc}" alt="" width="100">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1" name="" id="">
            <button class="btn btn-danger" role="button">REMOVE</button>
        </div>
    `
    cartRow.innerHTML = cartRowContents
    // append cartRow to the end of cartItems
    cartItems.append(cartRow)
    // add the remove fn to the newly added remove btn
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChange)
}

function quantityChange(e) {
    const input = e.target
    if(isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal()
}

function removeCartItem(e) {
    // the actual remove fn
    const btnClicked = e.target
    btnClicked.parentElement.parentElement.remove()
    updateCartTotal()
}

// update total price fn
function updateCartTotal() {
    const cartItemContainer = document.getElementsByClassName('cart-items')[0]
    const cartRows = cartItemContainer.getElementsByClassName('cart-row')
    let total = 0
    for(let i = 0; i < cartRows.length; i++) {
        const cartRow = cartRows[i]
        const priceEl = cartRow.getElementsByClassName('cart-price')[0]
        const quantityEl = cartRow.getElementsByClassName('cart-quantity-input')[0]
        const price = parseFloat(priceEl.innerText.replace('$', ''))
        const quantity = quantityEl.value
        total = total + (price * quantity)
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total
}