
var API_BASE_URL = 'http://localhost:8080/tp333/api';
var API_USERS = API_BASE_URL + '/users';

var currentUserId = null;
var deleteUserId = null;

document.addEventListener('DOMContentLoaded', function() {
    console.log(' Frontend JAX-RS initialisé');
    document.getElementById('connectionStatus').innerHTML = 
        '<i class="fas fa-check-circle me-2"></i>Backend : ' + API_BASE_URL;
    loadAllUsers();
});

//  Charger tous les utilisateurs
function loadAllUsers() {
    showLoading(true);
    
    var xhr = new XMLHttpRequest();
    xhr.open('GET', API_USERS + '/affiche', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    
    xhr.onload = function() {
        showLoading(false);
        if (xhr.status === 200) {
            try {
                var users = JSON.parse(xhr.responseText);
                displayUsers(users);
            } catch (error) {
                showError('Erreur de format JSON');
            }
        } else {
            showError('Impossible de charger les données : ' + xhr.statusText);
        }
    };
    
    xhr.onerror = function() {
        showLoading(false);
        showError('Erreur réseau - Vérifiez la connexion');
    };
    
    xhr.send();
}

//  Afficher les utilisateurs
function displayUsers(users) {
    var tableBody = document.getElementById('personsTableBody');
    var noDataMessage = document.getElementById('noDataMessage');
    var tableContainer = document.getElementById('tableContainer');

    if (!users || users.length === 0) {
        tableContainer.style.display = 'none';
        noDataMessage.style.display = 'block';
        document.getElementById('personCount').textContent = '0';
        return;
    }

    noDataMessage.style.display = 'none';
    tableContainer.style.display = 'block';

    var html = '';
    for (var i = 0; i < users.length; i++) {
        var user = users[i];
        html += '<tr id="user-' + user.id + '">' +
                '<td>' + user.id + '</td>' +
                '<td>' + (user.name || '') + '</td>' +
                '<td>' + user.age + '</td>' +
                '<td class="text-center">' +
                '<button class="btn btn-sm btn-warning me-2" onclick="editUser(' + user.id + ')">' +
                '<i class="fas fa-edit"></i></button>' +
                '<button class="btn btn-sm btn-danger" onclick="showDeleteModal(' + user.id + ', \'' + (user.name || '').replace(/'/g, "\\'") + '\')">' +
                '<i class="fas fa-trash"></i></button>' +
                '</td></tr>';
    }
    tableBody.innerHTML = html;
    document.getElementById('personCount').textContent = users.length;
}

//  Ajouter un utilisateur
function addUser() {
    var userData = {
        name: document.getElementById('nom').value,
        age: parseInt(document.getElementById('age').value)
    };

    var xhr = new XMLHttpRequest();
    xhr.open('POST', API_USERS + '/ajouter', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    
    xhr.onload = function() {
        if (xhr.status === 200 || xhr.status === 201) {
            try {
                var result = JSON.parse(xhr.responseText);
                showNotification('Utilisateur "' + userData.name + '" ajouté!', 'success');
                resetForm();
                loadAllUsers();
            } catch (error) {
                showNotification('Erreur : Réponse JSON invalide', 'danger');
            }
        } else {
            showNotification('Erreur ajout : ' + xhr.statusText, 'danger');
        }
    };
    
    xhr.onerror = function() {
        showNotification('Erreur réseau lors de l\'ajout', 'danger');
    };
    
    xhr.send(JSON.stringify(userData));
}

//  Modifier un utilisateur
function editUser(id) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', API_USERS + '/' + id, true);
    
    xhr.onload = function() {
        if (xhr.status === 200) {
            try {
                var result = JSON.parse(xhr.responseText);
                var user = result.user || result; 
                
                currentUserId = user.id;
                document.getElementById('personId').value = user.id;
                document.getElementById('nom').value = user.name;
                document.getElementById('age').value = user.age;

                document.getElementById('formTitle').innerHTML = '<i class="fas fa-user-edit me-2"></i>Modifier un Utilisateur';
                var btn = document.getElementById('submitBtn');
                btn.innerHTML = '<i class="fas fa-save me-2"></i>Mettre à jour';
                btn.className = 'btn btn-warning btn-lg py-2';
                btn.onclick = function() { updateUser(id); };
            } catch (error) {
                showNotification('Erreur : Données JSON invalides', 'danger');
            }
        } else {
            showNotification('Impossible de charger l\'utilisateur', 'danger');
        }
    };
    
    xhr.onerror = function() {
        showNotification('Erreur réseau', 'danger');
    };
    
    xhr.send();
}

//  Mettre à jour un utilisateur
function updateUser(id) {
    var userData = {
        name: document.getElementById('nom').value,
        age: parseInt(document.getElementById('age').value)
    };
    
    var xhr = new XMLHttpRequest();
    xhr.open('PUT', API_USERS + '/modifier/' + id, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    
    xhr.onload = function() {
        if (xhr.status === 200) {
            try {
                var result = JSON.parse(xhr.responseText);
                showNotification('Utilisateur "' + userData.name + '" modifié!', 'success');
                resetForm();
                loadAllUsers();
            } catch (error) {
                showNotification('Réponse JSON invalide', 'danger');
            }
        } else {
            showNotification('Erreur lors de la modification', 'danger');
        }
    };
    
    xhr.onerror = function() {
        showNotification('Erreur réseau', 'danger');
    };
    
    xhr.send(JSON.stringify(userData));
}

//  Supprimer un utilisateur
function showDeleteModal(id, name) {
    deleteUserId = id;
    document.getElementById('personToDelete').textContent =
        name + ' (ID: ' + id + ')';

    var modalElement = document.getElementById('deleteModal');

    if (typeof bootstrap !== 'undefined') {
        var modal = new bootstrap.Modal(modalElement);
        modal.show();
    } else {
        if (confirm('Confirmer la suppression de ' + name + ' ?')) {
            confirmDelete();
        }
    }
}

function confirmDelete() {
    if (!deleteUserId) return;

    var xhr = new XMLHttpRequest();
    xhr.open('DELETE', API_USERS + '/supprimer/' + deleteUserId, true);

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status >= 200 && xhr.status < 300) {
                var row = document.getElementById('user-' + deleteUserId);
                if (row) row.parentNode.removeChild(row);

                var modalElement = document.getElementById('deleteModal');
                var modal = bootstrap.Modal.getInstance(modalElement);
                if (modal) modal.hide();

                showNotification('Utilisateur supprimé!', 'success');
                deleteUserId = null;
            } else {
                showNotification('Erreur lors de la suppression', 'danger');
            }
        }
    };

    xhr.onerror = function() {
        showNotification('Erreur réseau lors de la suppression', 'danger');
    };

    xhr.send();
}



//  Recherche par ID
function searchById() {
    var id = document.getElementById('searchId').value;
    if (!id) {
        showNotification('Veuillez entrer un ID', 'warning');
        return;
    }
    
    var xhr = new XMLHttpRequest();
    xhr.open('GET', API_USERS + '/' + id, true);
    
    xhr.onload = function() {
        if (xhr.status === 200) {
            try {
                var result = JSON.parse(xhr.responseText);
                var user = result.user || result;
                displayUsers([user]);
            } catch (error) {
                showNotification('Erreur : données invalides', 'danger');
            }
        } else if (xhr.status === 404) {
            showNotification('Utilisateur non trouvé', 'warning');
        } else {
            showNotification('Erreur recherche ID', 'danger');
        }
    };
    
    xhr.onerror = function() {
        showNotification('Erreur réseau', 'danger');
    };
    
    xhr.send();
}

//  Recherche par nom
function searchByName() {
    var name = document.getElementById('searchName').value;
    if (!name) {
        showNotification('Veuillez entrer un nom', 'warning');
        return;
    }
    
    var xhr = new XMLHttpRequest();
    xhr.open('GET', API_USERS + '/affiche', true);
    
    xhr.onload = function() {
        if (xhr.status === 200) {
            try {
                var users = JSON.parse(xhr.responseText);
                var filtered = [];
                
                for (var i = 0; i < users.length; i++) {
                    if (users[i].name && users[i].name.toLowerCase().indexOf(name.toLowerCase()) !== -1) {
                        filtered.push(users[i]);
                    }
                }
                
                if (filtered.length === 0) {
                    showNotification('Aucun utilisateur trouvé', 'warning');
                    return;
                }
                
                displayUsers(filtered);
            } catch (error) {
                showNotification('Erreur : données invalides', 'danger');
            }
        } else {
            showNotification('Erreur recherche nom', 'danger');
        }
    };
    
    xhr.onerror = function() {
        showNotification('Erreur réseau', 'danger');
    };
    
    xhr.send();
}
// gestion de l'interface
function showLoading(show) {
    document.getElementById('loadingSpinner').style.display = show ? 'block' : 'none';
    document.getElementById('tableContainer').style.display = show ? 'none' : 'block';
}

function showError(message) {
    var el = document.getElementById('noDataMessage');
    el.innerHTML = '<div class="alert alert-danger">' + message + '</div>';
    el.style.display = 'block';
}

function showNotification(message, type) {
    if (!type) type = 'info';
    
    var alertDiv = document.createElement('div');
    alertDiv.className = 'alert alert-' + type + ' alert-dismissible fade show position-fixed';
    alertDiv.style.cssText = 'top:20px; right:20px; z-index:9999; max-width:400px;';
    alertDiv.innerHTML = message + '<button type="button" class="btn-close" data-bs-dismiss="alert"></button>';
    document.body.appendChild(alertDiv);
    
    setTimeout(function() {
        if (alertDiv.parentNode) {
            alertDiv.remove();
        }
    }, 5000);
}

function resetForm() {
    document.getElementById('personForm').reset();
    document.getElementById('personId').value = '';
    document.getElementById('formTitle').innerHTML = '<i class="fas fa-user-plus me-2"></i>Ajouter un Utilisateur';
    var btn = document.getElementById('submitBtn');
    btn.innerHTML = '<i class="fas fa-save me-2"></i>Ajouter';
    btn.className = 'btn btn-success btn-lg py-2';
    btn.onclick = addUser;
    currentUserId = null;
}

function submitForm() {
    if (currentUserId) {
        updateUser(currentUserId);
    } else {
        addUser();
    }
}
