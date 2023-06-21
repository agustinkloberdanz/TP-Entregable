// const url = 'https://3c04-181-231-122-56.ngrok-free.app/student'
const url = 'http://localhost:3000/students'


window.onload = () => {
    loadStudents()
}



function getStudents() {
    return new Promise(function (resolve, reject) {
        var request = new XMLHttpRequest()
        request.open('GET', url + '/getAll')
        request.responseType = 'json'
        request.onload = () => {
            if (request.status == 200) {
                resolve(request.response)
            } else {
                reject(Error(request.statusText))
            }
        }
        request.onerror = () => {
            reject(Error('Oops, there was a network error.'))
        }
        request.send()
    })
}

function getOneStudent(dni) {
    return new Promise(function (resolve, reject) {
        var request = new XMLHttpRequest()
        request.open('GET', url + '/dni/' + dni)
        request.responseType = 'json'
        request.onload = () => {
            if (request.status == 200) {
                resolve(request.response)
            } else {
                reject(Error(request.statusText))
            }
        }
        request.onerror = () => {
            reject(Error('Oops, there was a network error.'))
        }
        request.send()
    })
}

function removeStudent(id) {
    return new Promise(function (resolve, reject) {
        var request = new XMLHttpRequest()
        request.open('POST', url + '/' + id + '/delete')
        request.setRequestHeader('Content-Type', 'application/json')
        request.onload = () => {
            if (request.status == 200) {
                resolve(request.response)
            } else {
                reject(Error(request.statusText))
            }
        }
        request.onerror = () => {
            reject(Error('Oops, there was a network error.'))
        }
        request.send()
    })
}

function addStudent() {
    return new Promise(function (resolve, reject) {
        var request = new XMLHttpRequest()
        request.open('POST', url)
        request.setRequestHeader('Content-Type', 'application/json')

        var student = JSON.stringify({
            'dni': document.getElementById('dni').value,
            'firstName': document.getElementById('firstname').value,
            'lastName': document.getElementById('lastname').value,
            'email': document.getElementById('email').value,
            'cohort': document.getElementById('cohort').value,
            'status': document.getElementById('status').value,
            'address': document.getElementById('address').value,
            'phone': document.getElementById('phone').value,
            'gender': document.getElementById('gender').value
        })
        request.onload = () => {
            if (request.status == 201) {
                resolve(request.response)
            } else {
                reject(Error(request.statusText))
            }
        }
        request.onerror = () => {
            reject(Error('Oops, there was a network error.'))
        }
        request.send(student)
    })
}

function modifyStudent(id) {
    return new Promise(function (resolve, reject) {
        var request = new XMLHttpRequest()
        request.open('POST', url + '/' + id + '/update')
        request.setRequestHeader('Content-Type', 'application/json')
        var student = JSON.stringify({
            'dni': document.getElementById('dniMod').value,
            'lastName': document.getElementById('lastnameMod').value,
            'firstName': document.getElementById('firstnameMod').value,
            'email': document.getElementById('emailMod').value,
            'cohort': document.getElementById('cohortMod').value,
            'status': document.getElementById('statusMod').value,
            'gender': document.getElementById('genderMod').value,
            'address': document.getElementById('addressMod').value,
            'phone': document.getElementById('phoneMod').value
        })
        request.onload = () => {
            if (request.status == 200) {
                resolve(request.response)
            } else {
                reject(Error(request.statusText))
            }
        }
        request.onerror = () => {
            reject(Error('Oops, there was a network error.'))
        }
        request.send(student)
    })
}

////////////////////////////////////////////////////////////////////////////////////

function loadStudents() {
    getStudents()
        .then(response => {
            var tbody = document.getElementById('table-info-students')
            tbody.innerHTML = ''
            response.forEach(element => {
                var row = tbody.insertRow()
                var id = row.insertCell()
                id.innerHTML = element.id
                var dni = row.insertCell()
                dni.innerHTML = element.dni
                var lastname = row.insertCell()
                lastname.innerHTML = element.lastName
                var firstName = row.insertCell()
                firstName.innerHTML = element.firstName
                var email = row.insertCell()
                email.innerHTML = element.email
                var gender = row.insertCell()
                gender.innerHTML = element.gender

                var student = {
                    'id': element.id,
                    'dni': element.dni,
                    'lastName': element.lastName,
                    'firstName': element.firstName,
                    'email': element.email,
                    'cohort': element.cohort,
                    'status': element.status,
                    'gender': element.gender,
                    'address': element.address,
                    'phone': element.phone
                }

                var eliminar = row.insertCell()
                eliminar.style.border = 0
                var deleteButton = document.createElement('button')
                deleteButton.className = 'delete-button'
                deleteButton.addEventListener('click', () => deleteStudent(element.id))
                var i = document.createElement('i')
                i.className = 'fa fa-trash-o'
                deleteButton.appendChild(i)
                eliminar.appendChild(deleteButton)

                var view = row.insertCell()
                view.style.border = 0
                var viewButton = document.createElement('button')
                viewButton.className = 'view-button'
                viewButton.addEventListener('click', () => loadOneStudent(student))
                var i2 = document.createElement('i')
                i2.className = 'fa-solid fa-user'
                viewButton.appendChild(i2)
                view.appendChild(viewButton)
            })
            countStudents()
        })
        .catch(reason => {
            console.log(Error(reason))
        })
}


function loadOneStudent(student) {
    document.getElementById('idMod').value = student.id
    document.getElementById('dniMod').value = student.dni
    document.getElementById('lastnameMod').value = student.lastName
    document.getElementById('firstnameMod').value = student.firstName
    document.getElementById('emailMod').value = student.email
    document.getElementById('cohortMod').value = student.cohort
    document.getElementById('genderMod').value = student.gender
    document.getElementById('statusMod').value = student.status
    document.getElementById('addressMod').value = student.address
    document.getElementById('phoneMod').value = student.phone

    mostrar('button-modificar-div', 'update-students-div')
}


function saveStudent() {
    addStudent()
        .then(response => {
            loadStudents()
            limpiarInputsSave()
            successAlert('create')
        })
        .catch(reason => {
            console.log(Error(reason))
        })
}

function deleteStudent(id) {
    removeStudent(id)
        .then(response => {
            loadStudents()
        })
        .catch(reason => {
            console.log(Error(reason))
        })
}

function updateStudent(id) {
    modifyStudent(id)
        .then(response => {
            loadStudents()
            limpiarInputsUpdate()
            successAlert('update')
        })
        .catch(reason => {
            console.log(Error(reason))
        })
}

function countStudents() {
    getStudents()
        .then(response => {
            let cant = 0
            response.forEach((element => {
                cant++
            }))
            document.getElementById('cant-estudiantes').innerHTML = cant
        })
        .catch(reason => {
            console.log(Error(reason))
        })
}


function mostrar(id, divId) {
    var div = document.getElementById(divId)
    div.style.display = 'block'
    var button = document.getElementById(id)
    button.addEventListener('click', () => esconder(id, divId))

    if (button.id != 'button-students-table') {
        button.style.margin = '0'
    }

    if (button.id == 'button-mas-datos') {
        button.innerHTML = 'Menos datos'
    }
}

function esconder(id, divId) {
    var div = document.getElementById(divId)
    div.style.display = 'none'
    var button = document.getElementById(id)
    button.addEventListener('click', () => mostrar(id, divId))

    if (button.id != 'button-students-table') {
        button.style.marginBottom = '25px'
    }

    if (button.id == 'button-mas-datos') {
        button.innerHTML = 'Más datos'
    }
}

function successAlert(type) {
    var div
    if (type == 'update') {
        div = document.getElementById('alert-success-update')
        div.style.display = 'block'
        setTimeout((div = document.getElementById('alert-success-update')) => {
            div.style.display = 'none'
        },
            3000)
    }
    if (type == 'create') {
        div = document.getElementById('alert-success-create')
        div.style.display = 'block'
        setTimeout((div = document.getElementById('alert-success-create')) => {
            div.style.display = 'none'
        },
            3000)
    }
}

function limpiarInputsSave() {
    document.querySelector('#dni').value = ''
    document.querySelector('#lastname').value = ''
    document.querySelector('#firstname').value = ''
    document.querySelector('#email').value = ''
    document.querySelector('#cohort').value = ''
    document.querySelector('#status').value = ''
    document.querySelector('#address').value = ''
    document.querySelector('#phone').value = ''
    document.querySelector('#gender').value = ''
}

function limpiarInputsUpdate() {
    document.querySelector('#idMod').value = ''
    document.querySelector('#dniMod').value = ''
    document.querySelector('#lastnameMod').value = ''
    document.querySelector('#firstnameMod').value = ''
    document.querySelector('#emailMod').value = ''
    document.querySelector('#cohortMod').value = ''
    document.querySelector('#statusMod').value = ''
    document.querySelector('#addressMod').value = ''
    document.querySelector('#phoneMod').value = ''
    document.querySelector('#genderMod').value = ''
}