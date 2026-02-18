let concerts=[];

const addbtn=document.getElementById("addconcertbtn");
const concertList=document.getElementById("concertlist");
const errorMsg=document.getElementById("error");
const searchinput=document.getElementById("searchinput");
const filterDate=document.getElementById("filterdate");

addbtn.addEventListener("click",addconcerts);
searchinput.addEventListener("input",displayconcerts);
filterDate.addEventListener("change",displayconcerts);

function addconcerts()
{
    const name=document.getElementById("cname").value.trim();
    const date=document.getElementById("cdate").value;
    const location=document.getElementById("clocation").value.trim();
    const seats=parseInt(document.getElementById("totalseats").value);

    if(name===""||date===""||location===""||isNaN(seats)||seats<=0)
    {
        errorMsg.textContent=" ! Please fill all the fields";
        return;
    }
    errorMsg.textContent="";

    const concert={
        id: Date.now(),name,date,location,
        totalseats:seats,
        bookedseats:0
    };

    concerts.push(concert);
    displayconcerts();

    document.getElementById("cname").value="";
    document.getElementById("cdate").value="";
    document.getElementById("clocation").value="";
    document.getElementById("totalseats").value="";
}
function displayconcerts()
{
    concertList.innerHTML="";

    const searchText=searchinput.value.toLowerCase();
    const selectedDate=filterDate.value;

    concerts.
       filter(concert=>
       {
          const namematch=concert.name.toLowerCase().includes(searchText);
          const datematch=selectedDate===""||concert.date==selectedDate;
          return namematch && datematch;
        } )
        .forEach(concert => 
        {
            const remaining=concert.totalseats - concert.bookedseats;

            const div=document.createElement("div");
            div.className="concert";

            div.innerHTML=
           ` <h3>${concert.name}</h3>
            <p>Date: ${concert.date}</p>
            <p>Location: ${concert.location}</p>
            <p>Seats Left: ${remaining}</p>

            <input type="number" min="1" placeholder="tickets">
            <button onclick="bookTicket(${concert.id},this)">Book</button>`;

            concertList.appendChild(div);
        }
    );
    
}
function bookTicket(concertId,btn)
{
    const input=btn.previousElementSibling;
    const tickets=parseInt(input.value);

    if(isNaN(tickets) || tickets <= 0)
    {
        alert("Enter valid tickets count...");
        return;
    }
    const concert=concerts.find(c => c.id===concertId);

    if(concert.bookedseats + tickets > concert.totalseats)
    {
        alert("! not enough seats available");
        return;
    }

    concert.bookedseats+=tickets;
    alert("tickets booked successfully !...");
    displayconcerts();
    
}