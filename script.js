let content = document.getElementById('content');
let dots = document.getElementById('dots');
let slideIndex = 1;
getItems();

// Next/previous controls
function plusSlides(n) {
    showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}

function getItems() {
    fetch('https://fakestoreapi.com/products')
        .then(res => res.json())
        .then(items => {
            items.map((item, index) => {
                let slides = document.createElement('div');
                let img = document.createElement('img');
                let dot = document.createElement('span');
                let number = document.createElement('div')
                let caption = document.createElement('div')
                number.className = 'numbertext';
                caption.className = 'text';
                dot.className = "dot"
                dot.addEventListener('click', () => {
                    currentSlide(index + 1);
                })
                slides.addEventListener("click", ()=>{
                    getItem(item.id);
                })
                slides.setAttribute('id', 'slide-custom');
                slides.className = "mySlides fade";
                img.setAttribute("src", item.image);
                if (index == 0) { slides.style.display = 'block', dot.classList.add("active") };
                dots.appendChild(dot);
                content.appendChild(slides);
                number.appendChild(document.createTextNode((index + 1) + ' / ' + items.length))
                caption.appendChild(document.createTextNode(item.title))
                slides.appendChild(number)
                slides.appendChild(img);
                slides.appendChild(caption)
            })
        })
}

function cloneModal(){
    modal.classList.remove('open')
}

function getItem(id) {
    fetch('https://fakestoreapi.com/products/'+id)
        .then(res => res.json())
        .then(item => {
            let modal = document.getElementById('modal')
            let image = document.getElementById('img')
            modal.classList.add('open')
            image.setAttribute('src',item.image)
            document.getElementById('title').innerHTML = item.title
            document.getElementById('cat').innerHTML = item.category
            document.getElementById('price').innerHTML = item.price + '$ Rating ' + item.rating.rate + ' Count ' + item.rating.count
            document.getElementById('desc').innerHTML = item.description
         });
}

function openMenu(){
    let modal_menu = document.getElementById('modal-menu');
    modal_menu.classList.add('open')
}

function cloneMenu(){
    let modal_menu = document.getElementById('modal-menu');
    modal_menu.classList.remove('open')
}