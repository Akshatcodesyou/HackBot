document.addEventListener('DOMContentLoaded', () => {
    const cart = [];
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const checkoutButton = document.getElementById('checkout');

    function updateCart() {
        cartItems.innerHTML = '';
        let total = 0;
        cart.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `${item.name} - ${item.price} AED`;
            cartItems.appendChild(li);
            total += item.price;
        });
        cartTotal.textContent = total;
    }
    document.addEventListener('DOMContentLoaded', () => {
        // Dynamic cart logic
     });     

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', () => {
            const product = button.closest('.product');
            const productId = product.dataset.id;
            const productName = product.querySelector('h4').textContent;
            const productPrice = parseFloat(product.querySelector('p').textContent);
            
            cart.push({id: productId, name: productName, price: productPrice});
            updateCart();
            alert(`${productName} added to cart!`);
        });
    });

    checkoutButton.addEventListener('click', () => {
        if (cart.length === 0) {
            alert('Your cart is empty!');
        } else {
            alert('Thank you for your purchase!');
            cart.length = 0;
            updateCart();
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const items = document.querySelectorAll('.carousel-item');
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');

    let currentIndex = 0;

    // Function to show the current slide
    function showSlide(index) {
        items.forEach((item, i) => {
            item.classList.remove('active');
            if (i === index) item.classList.add('active');
        });
        document.querySelector('.carousel').style.transform = `translateX(-${index * 100}%)`;
    }

    // Show the first slide initially
    showSlide(currentIndex);

    // Event listeners for navigation buttons
    prevButton.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + items.length) % items.length; // Loop back to last slide
        showSlide(currentIndex);
        resetAutoSlide();
    });

    nextButton.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % items.length; // Loop back to first slide
        showSlide(currentIndex);
        resetAutoSlide();
    });

    // Auto-slide functionality (7 seconds)
    let autoSlideInterval = setInterval(() => {
        currentIndex = (currentIndex + 1) % items.length;
        showSlide(currentIndex);
    }, 7000);

   // Reset auto-slide interval when user interacts with buttons
   function resetAutoSlide() {
       clearInterval(autoSlideInterval);
       autoSlideInterval = setInterval(() => {
           currentIndex = (currentIndex + 1) % items.length;
           showSlide(currentIndex);
       }, 7000);
   }
});
document.addEventListener('DOMContentLoaded', () => {
    // Initialize cart from local storage or start empty
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const updateCart = () => {
        let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
        const cartItemsElement = document.getElementById('cart-items');
        const cartTotalElement = document.getElementById('cart-total');

        // Clear existing items
        cartItemsElement.innerHTML = '';

        // Calculate total
        let total = 0;
        cartItems.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `${item.name} - ${item.price} AED x ${item.quantity}`;

            total += item.price * item.quantity;
            cartItemsElement.appendChild(li);
        });

        cartTotalElement.textContent = total.toFixed(2);
    };

    const addToCart = (name, price, quantity) => {
        let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
        const itemIndex = cartItems.findIndex(item => item.name === name);

        if (itemIndex > -1) {
            // Update quantity if item already exists
            cartItems[itemIndex].quantity += quantity;
        } else {
            // Add new item
            cartItems.push({ name: name, price: price, quantity: quantity });
        }

        // Update localStorage and cart display
        localStorage.setItem('cart', JSON.stringify(cartItems));
        updateCart();
    };

    // Bind add to cart buttons for individual product pages
    const addToCartButton = document.querySelector('.add-to-cart');

    if (addToCartButton) {
        addToCartButton.addEventListener('click', () => {
            const name = addToCartButton.dataset.name;
            const price = parseFloat(addToCartButton.dataset.price);
            const quantity = parseInt(document.getElementById('quantity').value, 10);

            addToCart(name, price, quantity);
            alert(`${name} added to cart!`);
        });
    }

    // Carousel functionality
    const items = document.querySelectorAll('.carousel-item');
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');
    let currentIndex = 0;

    const showSlide = (index) => {
        items.forEach((item, i) => {
            item.classList.remove('active');
        });
        items[index].classList.add('active');
    };

    if (prevButton && nextButton) {
        showSlide(currentIndex);

        prevButton.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + items.length) % items.length;
            showSlide(currentIndex);
        });

        nextButton.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % items.length;
            showSlide(currentIndex);
        });

        setInterval(() => {
            currentIndex = (currentIndex + 1) % items.length;
            showSlide(currentIndex);
        }, 7000);
    }

     // Update cart display on page load
    updateCart();
});


//CHATBOT
let discountOffered = false;

document.addEventListener('mouseleave', function (e) {
    if (e.clientY <= 0 && !discountOffered) {
        showChatbot();
    }
});

function showChatbot() {
    const chatbot = document.getElementById('chatbot');
    const chatbotBody = document.getElementById('chatbot-body');
    chatbot.style.display = 'block';
    chatbotBody.innerHTML = `<p>Are you sure you want to leave? Don't miss out on a special offer!</p>
    <button onclick="offerDiscount()">Yes, I'm leaving</button>`;
}

function offerDiscount() {
    discountOffered = true;
    const chatbotBody = document.getElementById('chatbot-body');
    chatbotBody.innerHTML = `<p>How about a 15% discount to complete your purchase?</p>
    <button onclick="applyDiscount()">Apply Discount</button>
    <button onclick="closeChatbot()">No, thanks</button>`;
}

function applyDiscount() {
    alert('Discount applied! Complete your purchase to enjoy 15% off.');
    closeChatbot();
}

function closeChatbot() {
    document.getElementById('chatbot').style.display = 'none';
}
document.addEventListener('DOMContentLoaded', () => {
    // Initialize cart from local storage or start empty
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
  
    const updateCart = () => {
      const cartItemsElement = document.getElementById('cart-items');
      const cartSubtotalElement = document.getElementById('cart-subtotal');
      const cartShippingElement = document.getElementById('cart-shipping');
      const cartTotalElement = document.getElementById('cart-total');
  
      // Clear existing items
      if (cartItemsElement) {
        cartItemsElement.innerHTML = '';
      }
  
      // Calculate totals
      let subtotal = 0;
      cart.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `
                  <div class="product-image">
                      <img src="${getImageForItem(item.name)}" alt="${item.name}">
                  </div>
                  <div class="product-details">
                      <div class="product-name">${item.name}</div>
                      <div class="product-price">${item.price} AED</div>
                      <div class="product-quantity">Quantity: ${item.quantity}</div>
                  </div>
                  <button class="remove-item" data-name="${item.name}">Remove</button>
              `;
        if (cartItemsElement) {
          cartItemsElement.appendChild(li);
        }
        subtotal += item.price * item.quantity;
      });
  
      const shippingCost = subtotal > 0 ? 50 : 0;
      const total = subtotal + shippingCost;
  
      if (cartSubtotalElement) {
        cartSubtotalElement.textContent = subtotal.toFixed(2);
      }
      if (cartShippingElement) {
        cartShippingElement.textContent = shippingCost === 0 ? 'Free' : shippingCost.toFixed(2) + ' AED';
      }
      if (cartTotalElement) {
        cartTotalElement.textContent = total.toFixed(2);
      }
  
      localStorage.setItem('cart', JSON.stringify(cart));
    };
  
    const getImageForItem = (name) => {
      // Replace with your actual image paths
      switch (name) {
        case 'iPhone 16E':
          return 'assets/Iphone/image copy.png';
        case 'MacBook Pro M4':
          return 'assets/macbook/image copy.png';
        case 'QwertyKeys Mechanical Keyboard':
          return 'assets/Keyboard/image copy.png';
        case 'Samsung Galaxy S25 Ultra':
          return 'assets/Samsung/image copy.png';
        default:
          return 'assets/default.png'; // fallback image
      }
    };
  
    // Remove item event listener
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('remove-item')) {
        const itemName = e.target.dataset.name;
        cart = cart.filter(item => item.name !== itemName);
        updateCart();
      }
    });
  
    const addToCart = (name, price, quantity) => {
      let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
      const itemIndex = cartItems.findIndex(item => item.name === name);
  
      if (itemIndex > -1) {
        cartItems[itemIndex].quantity += quantity;
      } else {

        cartItems.push({
          name: name,
          price: price,
          quantity: quantity
        });
      }
  
      localStorage.setItem('cart', JSON.stringify(cartItems));
      updateCart();
    };

    const addToCartButton = document.querySelector('.add-to-cart');
  
    if (addToCartButton) {
      addToCartButton.addEventListener('click', () => {
        const name = addToCartButton.dataset.name;
        const price = parseFloat(addToCartButton.dataset.price);
        const quantity = parseInt(document.getElementById('quantity').value, 10);
  
        addToCart(name, price, quantity);
        alert(`${name} added to cart!`);
      });
    }

    const items = document.querySelectorAll('.carousel-item');
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');
    let currentIndex = 0;
  
    const showSlide = (index) => {
      items.forEach((item, i) => {
        item.classList.remove('active');
      });
      items[index].classList.add('active');
    };
  
    if (prevButton && nextButton) {
      showSlide(currentIndex);
  
      prevButton.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + items.length) % items.length;
        showSlide(currentIndex);
      });
  
      nextButton.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % items.length;
        showSlide(currentIndex);
      });
  
      setInterval(() => {
        currentIndex = (currentIndex + 1) % items.length;
        showSlide(currentIndex);
      }, 7000);
    }

    updateCart();
  
    function showChatbot() {
      document.getElementById('chatbot').style.display = 'block';
    }
  
    function closeChatbot() {
      document.getElementById('chatbot').style.display = 'none';
    }
  
    let hasExited = false;
    document.addEventListener('mouseleave', function (e) {
      if (e.clientY < 0 && !hasExited) {
        showChatbot();
        hasExited = true;
      }
    });
  });
