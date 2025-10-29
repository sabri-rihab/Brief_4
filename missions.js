fetch("missions.json")
    .then(function(response){return response.json()})
    .then(function(missions){
        let container = document.querySelector(".ms_cards");
        const name_mission = "appolo";
        let place ="";
        for(var mission of missions){
            place += `
                <div class="card">
                    <img src='${mission.image}' alt="">
                    <div class="details">
                        <p class="name_m">${mission.name}</p>
                        <p class="detail_m">${mission.objective}</p>
                        <p class="detail_m" style="width: 100%;">${mission.launchDate}</p>
                        <span><a style="color: #6FB1FC;" href="#">${mission.agency}</a></span>
                    </div>
                </div>
            `;
        }
        container.innerHTML = place;
    })
    .catch(error => console.error("Error loading missions:", error));