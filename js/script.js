let search;
$(document).ready(function(){
    //people
    $('#peopleBtn').click(function(){
        search = '/people';
        $('#people-container').empty();
        // let's make the request to our OWN server!
        $.ajax({
            url: search,
            dataType: 'json',
            success: (data) => {
                let people = data.results;
                for (person of people){
                    $('#people-container').append(`<li>${person.name}</li>`);
                    $("#next").show();
                    $("#allpeople").show();
                }
                console.log('got the data: ', data);
                console.log(data.results.length);
            }
        });
        return false;
    });
    //planets
    $('#planetsBtn').click(function(){
        search = '/planets';
        $('#people-container').empty();
        // let's make the request to our OWN server!
        $.ajax({
            url: search,
            dataType: 'json',
            success: (data) => {
                let people = data.results;
                for (person of people){
                    $('#people-container').append(`<li>${person.name}</li>`);
                    $("#next").show();
                    $("#allplanets").show();
                }
                console.log('got the data: ', data);
                console.log(data.results.length);
            }
        });
        return false;
    });
    //next
    $('#next').click(() => {
        console.log('clicking next');
        $.get('/next', (data) => { 
            console.log("next data", data);
            let html = "";
            for(let i = 0; i < data.results.length; i++) {
                html += `<li id="list">${data.results[i].name}</li>`;
                $("#prev").show();
            }
            $("#people-container").html(html);
            console.log(Math.floor(data.results.length));
        }, 'json');
    });
    //prev
    $('#prev').click(() => {
        console.log('clicking prev');
        $.get('/prev', (data) => {
            console.log("prev data", data);
            let html = "";
            for(let i = 0; i < data.results.length; i++) {
                html += `<li id="list">${data.results[i].name}</li>`;
            }
            $("#people-container").html(html);
            console.log(data.results.length)
        }, 'json');
    });
    //all people
    $('#allpeople').click(() => {
        console.log('getting all data');
        $.get('/people', (data) => { 
            console.log("all data", data);
            datas_length = Math.floor(data.count/10);
            for(let i = 0; i < datas_length; i++) {
                $.get('/next', (data) => { 
                console.log("next data", data);
                for(let i = 0; i < data.results.length; i++) {
                    $("#people-container").append('<li id="list">'+data.results[i].name+'</li>');
                }
            }, 'json');
            }
        }, 'json');
    });
    //all planets
    $('#allplanets').click(() => {
        console.log('getting all data');
        $.get('/planets', (data) => { 
            console.log("all data", data);
            datas_length = Math.floor(data.count/10);
            for(let i = 0; i < datas_length; i++) {
                $.get('/next', (data) => { 
                console.log("next data", data);
                for(let i = 0; i < data.results.length; i++) {
                    $("#people-container").append('<li id="list">'+data.results[i].name+'</li>');
                }
            }, 'json');
            }
        }, 'json');
    });
});