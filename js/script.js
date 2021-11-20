let btn = document.getElementById('btn');
let content = document.querySelector('.content');
let modalRes = document.querySelector('.modal-res');
let btnCloseModalRes = document.querySelector('.close-res');
let res = document.querySelector('.res');

let d = document.getElementById('d');
let m = document.getElementById('m');
let a = document.getElementById('a');

btn.addEventListener('click', e => {
    e.preventDefault();
    
    let loadBody = {
        d: d.value,
        m: m.value,
        a: a.value,
    };

    if (d.value === '' || m.value === '' || a.value === '') {
        alert('Um ou mais campo(s) vazio(s)!')
    } else {
        fetch('app.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify(loadBody)
        })
        .then(res => { return res.json() })
        .then(json => {  
                d.value = '';
                m.value = '';
                a.value = '';
                content.style.display = 'none'
                modalRes.classList.add('visible');
                modalRes.classList.remove('close');
                Object.values(json).map(mess => {
                    console.log(mess.message)
                    res.innerHTML = mess.message
                })
                btnCloseModalRes.addEventListener('click', () => {
                    modalRes.classList.remove('visible');
                    modalRes.classList.add('close');
                    content.style.display = 'block'
                })
            })
            .catch(err => console.log(err))
    }   
});

let modalHelp = document.querySelector('.modal-help');
let modalContentHelp = document.querySelector('.modal-help-guia');

let btnModalHelp = document.querySelector('.pointer-help');
btnModalHelp.addEventListener('click', () => {
    content.style.display = 'none'
    modalHelp.classList.remove('close');
    modalHelp.classList.add('visible');
});

let btnCloseModalHelp = document.querySelector('.close-modal-help');
btnCloseModalHelp.addEventListener('click', () => {
    modalHelp.classList.remove('visible');
    modalHelp.classList.add('close');
    content.style.display = 'block'
})