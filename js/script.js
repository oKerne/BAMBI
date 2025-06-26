function createHeader() {
    const header = document.querySelector('#header')
     const isHomePage = window.location.href.includes('home.html')
     const reSrc = isHomePage ? 'pages/': ''
     const reImg = isHomePage? '':'../'
     const tenantPage = reSrc + "Bambi-Tenants.html"

  
    const div = createElement('div', ['logo', 'col-md-12', 'col-sm-6'], [])
    header.append(div)
    const nav = createElement('nav', [], [])
    div.append(nav)
    const logoDiv = createElement('div', ['logo'], [])
    const img_logo = createElement('img', [], [{ key: 'src', value:reImg + "imges/cropped-logo.png" }, { key: 'alt', value: "לוגו" }])
    logoDiv.append(img_logo)
    nav.append(logoDiv)
    const ul = createElement('ul', [], [{ key: 'id', value: 'list-header' }])
    nav.append(ul)
     const homeHref = isHomePage ? 'home.html' : '../home.html'
     const li_h = createListItem(homeHref, 'דף הבית')
   
     
    const li_a = createListItemWithSubmenu(reSrc + 'About_us.html', 'אודות', [
        { href: 'About_us.html', text: 'מייסד החברה' },
        { href: 'About_us.html', text: 'מנכ"ל החברה' },
        { href: 'About_us.html', text: 'הסיפור שלנו' }
    ])
    const li_p = createListItemWithSubmenu(reSrc + 'project.html', 'פרויקטים', [
        { href: 'project.html', text: 'מסחר ויזמות' },
        { href: 'project.html', text: 'מגורים -פינוי בינוי' },
        { href: 'project.html', text: 'מגורים תמ"א 38' }
    ])
        const li_c = createListItemWithSubmenu(reSrc +'Our_location.html', 'צור קשר', [
        { href: 'Our_location.html', text: 'טלפון' },
        { href: 'Our_location.html', text: 'מייל' }
    ])

    ul.append(li_h, li_a, li_p, li_c)

    function createSearchBar() {
        const nav = document.querySelector('nav')
            if (document.getElementById('search-bar')) {
            return
        }
    
        const inputSearch = createElement('input', [], [
            { key: 'type', value: 'text' },
            { key: 'id', value: 'search-bar' },
            { key: 'placeholder', value: 'חפש פרויקט...' }
        ])
    
        const searchButton = createElement('button', ['search-button'], [
            { key: 'id', value: 'search-button' }
        ])
        searchButton.textContent = 'חפש'
    
        nav.append(inputSearch, searchButton)
    }
    
    function createElement(name, classes, attributes) {
        const element = document.createElement(name)
        classes.forEach(c => element.classList.add(c))
        attributes.forEach(a => element.setAttribute(a.key, a.value))
        return element
    }
    
    if (window.location.pathname === '/pages/project.html') {
        createSearchBar() // הצגת שורת החיפוש רק בעמוד הפרויקט
    }
 
    // Button
    const btn = createElement('button', ['tenants_button'], [])
    btn.setAttribute('onclick', `window.location.href = '${tenantPage}'`)
    const span = createElement('span', ['button-text'], [])
    span.textContent = 'כניסת דיירים'
    btn.append(span)
    div.append(btn)

    // כפתור המבורגר
    const hamburger = createElement('div', ['hamburger'], [])
    const hamburgerSpan = createElement('span', [], [])
    hamburgerSpan.textContent = '☰'
    hamburger.append(hamburgerSpan)

    const navMobile = createElement('nav', [], [{ key: 'id', value: 'header-none' }])
    const headerMobile = createElement('div', ['header-mobile'], [])
    const ulMobile = createElement('ul', ['mobile'], [])

    const Home = createListItem('../home.html', 'דף הבית')
    const About = createListItem(reSrc + 'About_us.html', 'אודות')
    const Projects = createListItem(reSrc + 'project.html', 'פרויקטים')
    const Contact = createListItem(reSrc +'Our_location.html', 'צור קשר')

    ulMobile.append(Home, About, Projects, Contact)
    headerMobile.append(ulMobile)
    navMobile.append(headerMobile)
    hamburger.append(navMobile)
    div.append(hamburger)
}

function createElement(name, classes, attributes) {
    let element = document.createElement(name)
    classes.forEach(c => element.classList.add(c))
    attributes.forEach(a => element.setAttribute(a.key, a.value))
    return element
}

function createListItem(href, text) {
    const li = createElement('li', [], []);
    const a = createElement('a', [], [{ key: 'href', value: href }])
    a.textContent = text
    li.append(a)
    return li
}

function createListItemWithSubmenu(href, text, submenuItems) {
    const li = createElement('li', ['wrap-manu-item'], [])
    const a = createElement('a', [], [{ key: 'href', value: href }])
    a.textContent = text
    li.append(a)

    const submenu = createElement('ul', ['submenu'], [])
    submenuItems.forEach(item => {
        const subLi = createElement('li', [], [])
        const subA = createElement('a', [], [{ key: 'href', value: item.href }])
        subA.textContent = item.text
        subLi.append(subA)
        submenu.append(subLi)
    });
    li.append(submenu)
    return li
}

createHeader()

function createFooter() {
    const isHomePage = window.location.href.includes('home.html')
    const reImg = isHomePage? '':'../'
    const footer = document.querySelector('#footer')
    const rowDiv = createElement('div', ['row'], [{ key: 'style', value: 'display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center;' }]);
    footer.append(rowDiv)
 
    const imgFooter=createElement('img', ['imge_footer', 'col-sm-3', 'col-md-6'], [{ key: 'src', value: reImg +'imges/Group-19-1.jpg' }, { key: 'alt', value: 'הדמיה פרויקט במבי' }]);
    rowDiv.append(imgFooter)
    const titleFooter = createElement('div', ['titel-footer', 'col-md-6', 'col-sm-12'], []);
    rowDiv.append(titleFooter)
    const title = createElement('h4', [], []);
    title.innerHTML = `לבדיקת היתכנות להתחדשות במקום מגוריכם,<br>לקבלת פרטים נוספים או לכל שאלה בנושא - צרו קשר:`;
    titleFooter.append(title)
    const form = createElement('form', [], []);
    titleFooter.append(form)
    const wrapInputs = createElement('div', ['row', 'wrap_inputs'], [{ key: 'id', value: 'input-footer' }]);
    form.append(wrapInputs)
    const inputs = [
        { type: 'text', name: 'text', placeholder: 'שם' },
        { type: 'tel', name: 'tel', placeholder: 'פלאפון' },
        { type: 'email', name: 'email', placeholder: 'אימייל' },
        { type: 'text', name: 'text', placeholder: 'כתובת' }
    ];
    inputs.forEach(inputData => {
        const input = createElement('input', ['col-6'], [
            { key: 'type', value: inputData.type },
            { key: 'name', value: inputData.name },
            { key: 'id', value: 'input' },
            { key: 'placeholder', value: inputData.placeholder }
        ]);
        wrapInputs.append(input)
    });

    const button = createElement('button', ['col-3'], [{ key: 'id', value: 'arrow-button' }])
    const buttonText = createElement('span', ['button_text'], []);
    buttonText.textContent = 'שליחה'
    const buttonIcon = createElement('img', ['arrow-icon'], [{ key: 'src', value: reImg +'imges/arrow_8034865.png' }])
    button.append(buttonText, buttonIcon)
    wrapInputs.append(button)


    const ul = createElement('ul', [], [])
     titleFooter.append(ul)

function createElement(tag, classes = [], attributes = []) {
    const element = document.createElement(tag);
    classes.forEach(className => element.classList.add(className));
    attributes.forEach(attr => element.setAttribute(attr.key, attr.value));
    return element
}


const contactInfos = [
    { href: 'https://waze.com/ul?q=הפלמ"ח%2024,%20ירושלים&z=10&navigate=yes', iconClass: 'fab fa-waze', text: 'הפלמ"ח 24, ירושלים' },
    { href: 'tel:026411330', iconClass: 'fas fa-phone-alt', text: '02-6411330' },
    { href: 'mailto:office@bambi-nadlan.co.il?subject=הודעה%20מהאתר', iconClass: 'far fa-envelope', text: 'office@bambi-nadlan.co.il' }
];

contactInfos.forEach(info => {
    const li = createElement('li', ['icon-list']);
    const a = createElement('a', [], [{ key: 'href', value: info.href }])
    const icon = createElement('i', info.iconClass.split(' '))
    const span = createElement('span')
    span.textContent = info.text
    
    a.append(icon, span)
    li.append(a)
    ul.append(li)
});

    
    
    const addImage = createElement('img', ['element'], [{ key: 'src', value: reImg +'imges/Frame.svg' }]);
    titleFooter.append(addImage)
}

function createElement(name, classes, attributes) {
    const element = document.createElement(name)
    if (classes.length > 0) {
        element.classList.add(...classes)
    }
    attributes.forEach(a => element.setAttribute(a.key, a.value))
    return element
}


createFooter()
