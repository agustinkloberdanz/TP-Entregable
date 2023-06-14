// const url = 'https://1bdd-2800-2245-9000-4b4-6e25-e5b2-b951-4c59.ngrok-free.app/student' // profe
// const url = 'https://204a-190-191-212-26.ngrok-free.app/student.json' // mia
const url = 'https://my-json-server.typicode.com/agustinkloberdanz/pruebas-request/student' // mia

window.onload = () => {
    loadStudents()
}

// PROMISES

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

function getOneStudent(id) {
    return new Promise(function (resolve, reject) {
        var request = new XMLHttpRequest()
        request.open('GET', url + `/dni/${id}`)
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
        request.open('POST', url + `/${id}/delete`)
        // request.open('POST', url + '/' + id + '/delete')
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
            'cohort': '0',
            'status': 'activo',
            'gender': 'masculino',
            'address': 'abc123',
            'phone': '000'

            // No hardcodeado
            // 'cohort': document.getElementById('cohort').value,
            // 'status': document.getElementById('status').value,
            // 'gender': document.getElementById('gender').value,
            // 'address': document.getElementById('address').value,
            // 'phone': document.getElementById('phone').value
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

function modifyStudent() {
    var idMod = document.getElementById('idMod').value
    return new Promise(function (resolve, reject) {
        var request = new XMLHttpRequest()
        request.open('POST', url + `/${idMod}/update`)
        request.setRequestHeader('Content-Type', 'application/json')
        var student = JSON.stringify({
            'dni': document.getElementById('dniMod').value,
            'lastName': document.getElementById('lastnameMod').value,
            'firstName': document.getElementById('firstnameMod').value,
            'email': document.getElementById('emailMod').value,
            'cohort': '0',
            'status': 'activo',
            'gender': 'masculino',
            'address': 'abc123',
            'phone': '000'

            // No hardcodeado
            // 'cohort': document.getElementById('cohortMod').value,
            // 'status': document.getElementById('statusMod').value,
            // 'gender': document.getElementById('genderMod').value,
            // 'address': document.getElementById('addressMod').value,
            // 'phone': document.getElementById('phoneMod').value
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

// FUNCTIONS

function loadStudents() {
    getStudents()
        .then((response) => {
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

                var eliminar = row.insertCell()
                var deleteButton = document.createElement('button')
                deleteButton.setAttribute('class', 'delete-button')
                deleteButton.addEventListener('click', () => deleteStudent(element.id))
                var i = document.createElement('i')
                i.setAttribute('class', 'fa fa-trash-o')
                buttonEliminar.appendChild(i)
                eliminar.appendChild(deleteButton)

                document.querySelector('#dni').value = ''
                document.querySelector('#lastname').value = ''
                document.querySelector('#firstname').value = ''
                document.querySelector('#email').value = ''

            })
            countStudents()
        })
        .catch((reason) => {
            console.log(Error(reason))
        })
}

function loadOneStudent(id) {
    getOneStudent(id)
        .then((response) => {
            document.getElementById('idABuscar').value = ''
            document.getElementById('idBuscar').innerHTML = response.id
            document.getElementById('dniBuscar').innerHTML = response.dni
            document.getElementById('firstnameBuscar').innerHTML = response.firstName
            document.getElementById('lastnameBuscar').innerHTML = response.lastName
            document.getElementById('emailBuscar').innerHTML = response.email
        })
        .catch((reason) => {
            console.log(Error(reason))
        })
}

function saveStudent() {
    addStudent()
        .then(response => {
            loadStudents()
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

function updateStudent() {
    modifyStudent()
        .then(response => {
            loadStudents()
        })
        .catch(reason => {
            console.log(Error(reason))
        })

    document.querySelector('#dniMod').value = ''
    document.querySelector('#lastnameMod').value = ''
    document.querySelector('#firstnameMod').value = ''
    document.querySelector('#emailMod').value = ''
}

function countStudents() {
    getStudents()
        .then((response) => {
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
    button.style.margin = 0
}

function esconder(id, divId) {
    var div = document.getElementById(divId)
    div.style.display = 'none'
    var button = document.getElementById(id)
    button.addEventListener('click', () => mostrar(id, divId))
    button.style.marginBottom = '25px'

}
