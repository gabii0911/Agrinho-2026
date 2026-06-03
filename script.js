const reveals = document.querySelectorAll('.reveal');

function showSections() {

    reveals.forEach(section => {

        const top = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if(top < windowHeight - 100){
            section.classList.add('active');
        }
    });
}

window.addEventListener('scroll', showSections);
showSections();

const counters = document.querySelectorAll('.counter');

counters.forEach(counter => {

    const update = () => {

        const target = +counter.getAttribute('data-target');
        const current = +counter.innerText;

        const increment = target / 120;

        if(current < target){

            counter.innerText =
            Math.ceil(current + increment);

            setTimeout(update, 15);

        }else{

            counter.innerText =
            target.toLocaleString('pt-BR');
        }
    }

    update();
});