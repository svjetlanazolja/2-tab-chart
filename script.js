//kada se ucita HTML dodajemo obradu svih dogadjaja
$(function () {

    //kada se klikne na naziv prvog taba onda se on prikaze, a drugi sakrije
    $("#tab-naslov-dokumenti").click(function () {
        $(".prvi-tab").show();
        $(".drugi-tab").hide();
    });

    //i obrnuto
    $("#tab-naslov-statistika").click(function () {
        $(".prvi-tab").hide();
        $(".drugi-tab").show();
    });

    //ucitavanje fajla
    $("#btn-ucitaj").click(function () {
        //prvo se uzme ime fajla koji korisnik zeli da otvori
        var naziv = $("#txt-ucitaj").val();
        if (localStorage.getItem(naziv) == null) { //ako fajl prethodno nije sacuvan
            $(".poruka").text("Fajl nije pronadjen"); //onda se pripremi poruka
            $(".poruka").show(); //i prikaze
            setTimeout(() => { //a nakon 5s ova poruka se sakrije
                $(".poruka").hide();
            }, 5000);
        } else { //a ako trazeni fajl postoji
            $("#txt-naziv").val(naziv); //onda naziv prikazemo u odgovarajucem polju
            $("#txt-sadrzaj").val(localStorage.getItem(naziv)); //a sadrzaj se procita iz localstorage-a i prikaze u drugom polju
        }
    });

    //opcije za poravnanje dodaju CSS stil na textarea
    $("#btn-lijevo-poravnanje").click(function () {
        $("#txt-sadrzaj").css("text-align", "left");
    });

    $("#btn-desno-poravnanje").click(function () {
        $("#txt-sadrzaj").css("text-align", "right");
    });

    $("#btn-centralno-poravnanje").click(function () {
        $("#txt-sadrzaj").css("text-align", "center");
    });

    $("#btn-veci-font").click(function () {
        /*
        Uzme se trenutni font. Posto je velicina u formatu "brojpx" gdje je px oznaka za pixel, da bi se povecao broj treba izbaciti px iz rezultata.
        To se radi pomocu parseInt i onda ostaje samo broj.
        */
        var velicinaSlova = parseInt($("#txt-sadrzaj").css("font-size"));
        $("#txt-sadrzaj").css("font-size", ++velicinaSlova + "px");//broj se poveca i doda se px da se stil moze primjeniti
    });

    $("#btn-manji-font").click(function () {
        var velicinaSlova = parseInt($("#txt-sadrzaj").css("font-size"));
        $("#txt-sadrzaj").css("font-size", --velicinaSlova + "px");
    });

    $("#chb-zabrani").change(function () { //kada se klikne na zabranu
        if (this.checked) { //ako je oznacen checkbox
            $("input[type!='checkbox']").attr('disabled', 'disabled'); //sve inpute osim ovog checkbox-a treba zabraniti
            //da nije navedeno svi tipovi osim checkbox, onda bi i on bio blokiran (disabled) pa se ne bi moglo deblokirati
            $("button").attr('disabled', 'disabled'); //svi buttons
            $("textarea").attr('disabled', 'disabled'); //i textarea
        } else { //ako nije blokirano onda sklanjamo disabled sa elemenata
            $("input[type!='checkbox']").removeAttr('disabled');
            $("button").removeAttr('disabled');
            $("textarea").removeAttr('disabled');
        }
    });

    grafikon();
});

function sacuvaj() {
    var nazivFajla = $("#txt-naziv").val(); //sta je korisnik upisao za naziv
    var sadrzaj = $("#txt-sadrzaj").val(); //sadrzaj fajla
    localStorage.setItem(nazivFajla, sadrzaj); //sacuvamo
    document.forms[0].reset(); //i ponistimo vrijednosti da se moze napraviti novi fajl
    grafikon(); //kada dodamo novi dokument onda cemo osvjeziti prikaz grafikona
    $(".poruka").text("Uspjesno sacuvano"); //prikazemo poruku
    $(".poruka").show();
    setTimeout(() => {
        $(".poruka").hide(); //a nakon 5s sakrijemo poruku
    }, 5000);
}

function grafikon() {
    var podaci = Object.values(localStorage).map(v=>v.length);
    
    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: Object.keys(localStorage),
            datasets: [{
                label: 'Broj slova',
                data: podaci,
                backgroundColor: [
                    "red",
                    "blue",
                    "yellow",
                    "green",
                    "black"
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            title: {
                display: true,
                text: 'Prikaz broj slova u dokumentima'
            },
            legend: {
                display: true,
                labels: {
                    fontColor: 'rgb(255, 99, 132)'
                }
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}