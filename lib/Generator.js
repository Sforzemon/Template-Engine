function switchRole(teammate) {
    role = teammate.getRole();
    if (role === "Manager") {
        return `Office Number: ${teammate.getOfficeNumber()}`;
    } else if (role === "Engineer") {
        return `GitHub: <a href="https://github.com/${teammate.getGithub()}" target="_blank">${teammate.getGithub()}</a>`
    } else if(role === "Intern") {
        return `School: ${teammate.getSchool()}`
    } else {
        return "";
    }
}

function getIcon(teammate) {
    role = teammate.getRole();
    if (role === "Manager") {
        return `<i class="fas fa-mug-hot"></i>`
    } else if (role === "Engineer") {
        return `<i class="fas fa-glasses"></i>`
    } else if(role === "Intern") {
        return `<i class="fas fa-user-graduate"></i>`
    } else {
        return "";
    }
}

function memberCard(teammate){
    return `
        <div class="col d-flex justify-content-center">
            <div class="card my-2" style="width: 16rem;">
                <div class="card-header text-center">
                    <h2 class="card-title" id="Name">${teammate.getName()}</h2>
                    <hr>
                    <h5 class="card-text">${getIcon(teammate)} ${teammate.getRole()}</h5>
                </div>
                <div class="card-body">
                <ul class="list-group">
                    <li class="list-group-item">ID: 
                        <span id="ID">${teammate.getId()}</span>
                    </li>
                    <li class="list-group-item">Email: 
                        <span id="email">${teammate.getEmail()}</span>
                    </li>
                    <li class="list-group-item">${switchRole(teammate)}
                    </li>
                </ul>
                </div>
            </div>
        </div>
    `;
}

var mainTemplate = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Main Template</title>
        <link rel="icon" type="image/png" href="./assets/Site Favicon.png">
        <link href= "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.css" rel="stylesheet">
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
        <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
        <link rel="stylesheet" href="./../lib/assets/style.css">
    </head>
    <body>
        <div class="jumbotron mx-auto text-center w-75">
            <div class="container">
                <h1 class="display-4">Meet the team!!</h1>
                <hr>
                <h5>Here is your list of all-stars:</h5>
            </div>
        </div>
    
        <div class="container-fluid w-75 mx-auto">
            
            <div class="row">
`;

var footer = `
            </div>
        </div>
        <footer class="footer small text-center pt-4">
        Lovingly made by MH Design
        <footer>
    </body>
    </html>`

function generateHTML(array){
    return `${mainTemplate}${array.map(memberCard).join("")}${footer}`;
}

module.exports = {
    generateHTML: generateHTML
};