
document.querySelector('body').onload =()=>{
    zoomImg()
//    searchProject()
}

//פונקצית תמונה בהגדלה 
function zoomImg() {

    const projects = document.querySelectorAll('.image-project')
    projects.forEach(function (project) {
        const image = project.querySelector('img')
        const h4 = project.querySelector('h4').innerText
        const p = project.querySelector('p').innerText
        const address = h4

        image.addEventListener('click', function () {
            showPopup(image.src, h4, p, address)
        })
    })
    //הפונקציה יוצרת חלון קופץ עם פרטי התמונה
    function showPopup(src, titelTxt, pText, address) {
        // רקע - מאחורי החלון הקופץ
        const backdrop = document.createElement('div')
        backdrop.classList.add('backdrop')
        backdrop.onclick = closePopup
        document.body.appendChild(backdrop)

        // DIV
        const popup = document.createElement('div')
        popup.id = 'popup'
        popup.classList.add('popup')
        document.body.appendChild(popup)

        // הצגת התמונה בחלון
        const popupImage = document.createElement('img')
        popupImage.classList.add('popup-content')
        popupImage.src = src

        // כפתור סגירה של החלון 
        const close = document.createElement('span')
        close.classList.add('close')
        close.innerHTML = '&times;'
        close.onclick = closePopup

        const popupTitle = document.createElement('h4')
        popupTitle.classList.add('popup-title')
        popupTitle.innerHTML = titelTxt

        const popupText = document.createElement('p')
        popupText.classList.add('popup-text')
        popupText.innerHTML = pText


        // googel maps - הצגת מיקום בהתאם לתמונה 
        const mapFrame = document.createElement('iframe')
        mapFrame.classList.add('popup-map')
        mapFrame.src = `https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed`
        mapFrame.style.width = '100%'
        mapFrame.style.height = '400px'
        mapFrame.style.border = '0'
        mapFrame.style.margin = '5px'
        // הרכבת החלון הקופץ
        popup.append(close, popupImage, popupTitle, popupText, mapFrame)
        document.body.append(backdrop, popup)

        backdrop.style.display = 'block'
        popup.style.display = 'block'
    }
    // פונקציה לסגירת החלון ע"י כפתור הסגירה / לחיצה על המסך 
    function closePopup() {
        document.querySelectorAll('.backdrop, #popup').forEach(event => event.remove());
    }
}
//>>>>>>>>>>>>>>> חיפוש לפי פרויקט >>>>>>>>>>>>>>>>>>>>>>
 // function searchProject() { בצורה הזאת לא עבד לי 
// document.getElementById('search-button')?.addEventListener('click',searchProject)
 document.addEventListener('DOMContentLoaded', function () {
    const searchBar = document.getElementById('search-bar')
    const searchButton = document.getElementById('search-button')
    // חיפוש בעת  לחיצה על כפתור החיפוש
    searchButton?.addEventListener('click', (event) => {
        event.preventDefault()
        const query = searchBar.value
        window.location.search = `search=${query}`
    })
    //חיפוש בעת לחיצה על מקש Enter
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            const query = document.getElementById('search-bar').value
            filterProjects(query)
        }
    })
    window.addEventListener('load', () => {
        const params = new URLSearchParams(location.search)
        const search = params.get('search')
        if (search) {
            document.getElementById('h1').innerText = `${search}`

            //סינון הפרויקטים בהתאם לחיפוש
            const filteredProjects = Array.from(document.querySelectorAll('.image-project')).filter(project => {
                const name = project.querySelector('h4').innerText
                const description = project.querySelector('p').innerText
                return name.includes(search) || description.includes(search)
            })

            filteredProjects.forEach(project => {
                const description = project.querySelector('p').innerText
                const indexOf = description.indexOf('פינוי בינוי')

                if (indexOf !== -1) {
                    project.querySelector('p').innerHTML += ` <span>( איכלוס בקרוב ממש בעוד ${indexOf} חודשים )</span>`
                }
            })

            filteredProjects.forEach(project => {
                project.style.display = ''
            })

            document.querySelectorAll('.image-project').forEach(project => {
                if (!filteredProjects.includes(project))
                    project.style.display = 'none'
            })
        } else
            document.querySelectorAll('.image-project').forEach(project => project.style.display = '')
    })
})
//        >>>>>>>>>>>>>>>>>>>>>>>>>>>>  כניסת דיירים >>>>>>>>>>>>>>>>>>>>>>>>
let usersArray = [
    { firstName: 'רחל', lastName: 'רפאלי', password: 'RF34789', project: 'פרויקט קריית אונו – צומת סביון קריית אונו', url: '../imges/rozenblat.jpg ' },
    { firstName: 'מרים', lastName: 'שלום', password: 'MRIAMsalom66', project: 'בית הערבה-ארנונה ירושלים', url: '../imges/beit_hasrsva.jpg' },
    { firstName: 'שושי', lastName: 'מרקוביץ', password: 'SMR@234', project: 'התחדשות בזנגוויל – קריית יובל ירושלים', url: '../imges/hitchadshutzvil.jpg' },
    { firstName: 'דינה', lastName: 'כהן', password: 'DinaCoen1972', project: 'רוזנבלט 180 – רמות ירושלים', url: '../imges/rozenblat.jpg' },
]
// שמירת UserArray הראשוני ב -  localStorage אם עדיין לא קיים
if (!localStorage.getItem("users")) {
    localStorage.setItem("users", JSON.stringify(usersArray))
}
// שימוש בנתונים מ localStorage / שליפת הנתונים
let users = localStorage.getItem("users")
let usersObj = JSON.parse(users) || usersArray

document.getElementById('loginForm')?.addEventListener('submit', onLogin)

function onLogin(event) {
    event.preventDefault()

    const firstName = document.getElementById('input-name').value
    const lastName = document.getElementById('input-last-name').value
    const password = document.getElementById('input-password').value

    if (firstName && lastName && password) {
        const user = usersObj.find(u => u.firstName === firstName && u.lastName === lastName && u.password === password)
        if (user) {
            document.getElementById('loginForm').style.display = 'none'
            const projectDiv = document.createElement('div')
            projectDiv.setAttribute("id", "projectDiv")
            projectDiv.innerHTML = `
                  <div style="text-align: center; color: white; font-size: 16px; padding-top: 80px;">
                <h4>שלום ${user.firstName}!</h4>
                <p>הפרויקט שלך: ${user.project}</p>
                <img src="${user.url}" style="display: block; margin: 0 auto; max-width: 90%; height: auto; border: 1px solid #ddd; border-radius: 4px; padding: 5px;" />
                </div>`
             document.getElementById("data").appendChild(projectDiv)

        } else {
            if (confirm('המשתמש לא נמצא. האם ברצונך להירשם כמשתמש חדש?')) {
                const newUser = {
                    firstName,
                    lastName,
                    password,
                    project: 'פרויקט חדש',
                    url: '../imges/default.jpg'
                }
                usersObj.push(newUser)
                localStorage.setItem("users", JSON.stringify(usersObj))
                alert(`משתמש חדש ${firstName} ${lastName} נוסף בהצלחה!`)

                document.getElementById('loginForm').style.display = 'none'

                const projectDiv = document.createElement('div')
                projectDiv.setAttribute("id", "projectDiv")
            
                projectDiv.innerHTML = `
                    <div style="text-align: center; color: white; font-size: 11px; padding-top: 80px;">
                    <h4>שלום ${newUser.firstName}!</h4>
                    <p>הפרויקט שלך: ${newUser.project}</p>
                    <img src="${newUser.url}" style="display: block; margin: 0 auto; max-width: 90%; height: auto; border: 1px solid #ddd; border-radius: 4px; padding: 5px;" />
                    </div>`;
            } else {
                const err = document.getElementById("error")
                err.innerHTML = "אחד או יותר מהפרטים שהוכנסו שגוי!"
                err.style.color = "red"
                
            }
        }
    } else {
        alert('נא למלא את כל השדות להתחברות!')
    }
}

//  >>>>>>>>>>>>>>>>>>>>>>>>>>  המלצות <<<<<<<<<<<<<<<<<
const recommendations = [
    { name: 'יוסי כהן', text: 'המלצה נהדרת על השירות המעולה שקיבלתי.' },
    { name: 'רונית לוי', text: 'שירות מהיר ויעיל, ממליצה בחום!' },
    { name: 'דני ישראלי', text: 'חוויה נפלאה, יחזור שוב בקרוב.' }
]
const sortedRecom = [...recommendations].sort((a, b) => a.name.localeCompare(b.name))
const mapRecom = sortedRecom.map(({ name, text }) => [name, text])
const recomonObject = Object.fromEntries(mapRecom)

// פונקציה להצגת המלצה במסך
function displayRecom(index) {
    const container = document.querySelector('.recommendation-container')
    const active = container?.querySelector('.recommendation')
    const [name, text] = mapRecom[index]

    // יצירת המלצה חדשה
    const newDiv = document.createElement('div')
    newDiv.classList.add('recommendation')
    newDiv.id = `recom-${index}` // הוספת id
    newDiv.setAttribute('data-index', index) // הוספת data-index
    const nameEl = document.createElement('h3')
    const textEl = document.createElement('p')

    const updatedText = text.replace('שירות', 'שירות מעולה')

    nameEl.textContent = name
    textEl.textContent = updatedText

    newDiv.appendChild(nameEl)
    newDiv.appendChild(textEl)
    container?.append(newDiv)

    // לעבור על ההמלצה הפעילה
    if (active) {
        active.classList.add('exit');
        active.addEventListener('transitionend', function handler(event) {
            if (event.propertyName === 'transform') {
                container.removeChild(active)
                active.removeEventListener('transitionend', handler)
            }
        })
    }

    setTimeout(() => {
        newDiv.classList.add('active')
    }, 50)
}
// אתחול ומעבר בין ההמלצות
let currentIndex = 0
displayRecom(currentIndex)

setInterval(() => {
    currentIndex = (currentIndex + 1) % mapRecom.length
    displayRecom(currentIndex)
}, 3000)
