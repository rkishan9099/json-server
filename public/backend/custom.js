//// Required variable deceleration
let course_title = document.querySelector("#course_title");
let course_image = document.querySelector("#course_image");
let course_price = document.querySelector("#course_price");
let lacture_list = document.querySelector("#lacture_list");

let adminId = 1;
let id = 1;
let url_parse=new URL(window.location);
let main_url= url_parse.origin+'/';
console.log(main_url)

//// data fetch in json server through this function👇👇👇 
const fetchData = async (url) => {
  try {
    let res = await fetch(url);
    let data = await res.json();
    return data;

  } catch (error) {
    console.log(error);
  }
}

//// data upadte in json server through this function👇👇👇
const updateData = async (url, data) => {
  try {
    let res = await fetch(url, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: { 'Content-type': 'application/json; charset=UTF-8 ' }
    });
    return await res.json();
  } catch (error) {
    alert(error)
  }
}

/// data delete in json server through this function 👇👇👇
const deleteRecord = async (url) => {
  try {
    let res = await fetch(url, {
      method: "DELETE",
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    });
    let data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

//// data add in json server through this function👇👇👇
async function addRecord(url, data) {
  try {
    let res = await fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: { 'Content-type': 'application/json; charset=UTF-8 ' }
    });
    let data2 = await res.json();
    return data2;
  } catch (error) {
    alert(error);
  }
}

/*-----------------------------------------------------
----------------  Course CURD OPERATION   -------------
-----------------------------------------------------*/

function getCourseInput() {
  return {
    title: course_title.value,
    image: course_image.value,
    price: course_price.value,
    addedBy: adminId
  }
}


//// add lacture form to Course form 
let lacture_count = 1;
const addLacture = () => {
  lacture_count++;
  let div = document.createElement(`div`);
  div.className = `mt-4 lacture_${lacture_count}`;
  let html = ` 
                    <div class="flex justify-between border-b pb-1 mb-2">
                      <h3>Lacture ${lacture_count}</h3>
                      <div>
                       <button class="bg-red-400 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline text-xs" type="button" onclick="removeLacture(${lacture_count})">
                          Remove
                        </button>
                      </div>
                    </div>
                    <div class="mb-4">
                      <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                        Lacture Title
                      </label>
                      <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Lecture Title" name="lact_title[]">
                    </div>
                    <div class="mb-4">
                      <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                        Lacture video
                      </label>
                      <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Lecture Video" name="video[]">
                    </div>
                    <div>
                      <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                        Lacture Discription
                      </label>
                      <textarea class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Lecture Title" name="desc[]"></textarea>
                    </div>
                   `;
  div.innerHTML = html;
  lacture_list.appendChild(div)

}


/// remove lacture form from course form
const removeLacture = (id) => {
  document.querySelector(`.lacture_${id}`).remove();
}

/// course add in json server👇👇👇👇
const addCourece = async (id) => {
 let url = main_url+'courses?addedBy='+id;
  cource = await fetchData(url);
  // console.log(cource)
  let html = ``;
  cource.map((item) => {
    html += `<div class="group relative course_${item.id}">
    <div class="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
    <img src="${item.image}"  class="w-full h-full object-center object-cover lg:w-full lg:h-full">
    </div>
    <p class="text-sm mt-2 font-medium text-gray-900">${item.title}</p>
    <div class="mt-4 flex justify-between">
    <a
    href="edit.html?id=${item.id}"
    type="button"
    data-mdb-ripple="true"
    data-mdb-ripple-color="light"
    class="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
    >Edit</a>
    <button
    type="button"
    onclick="removeCource(${item.id});"
    data-mdb-ripple="true"
    data-mdb-ripple-color="light"
    class="inline-block px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out"
    >Delete</button>

    </div>
    </div>`;
  });
  
let course_list=document.querySelector("#cource_list");
course_list.innerHTML=html;
console.log(8888);
}
addCourece(id);

/// course remove from json server 👇👇👇
async function removeCource(id) {
  let url = main_url+"/courses/"+id;
 let data= await deleteRecord(url);
 console.log(data);
  /***** course lacture delete ***/
  let url1=main_url+"course_lacture?courseId="+id;
 await deleteRecord(url1);
  document.querySelector(".course_"+id).remove();

}


const lactureAdd = async (cid) => {
  let lacture_title = document.getElementsByName("lact_title[]");
  let lacture_video = document.getElementsByName("video[]");
  let lacture_desc = document.getElementsByName("desc[]");
  if(lacture_title.length>0){
  for (let i = 0; i < lacture_title.length; i++) {
    let lact_data = {
      courseId: cid,
      title: lacture_title[i].value,
      video: lacture_video[i].value,
      desc: lacture_desc[i].value
    }
    await addRecord(main_url+'course_lacture', lact_data);
    //console.log(lact_data)
  }
  }
}
  async function submitAddCource() {
    let course_input = getCourseInput();
    console.log(course_input);
    let url = main_url+"courses";
    let res = await addRecord(url, course_input);
    let inserted_course_id = res.id;
    await lactureAdd(inserted_course_id);
  
  window.location.href = "index.html";
}






//////// update course details
let params = new URLSearchParams(document.location.search);
console.log(params);
if(params.get("id")!="" && params.get("id")>0){
let cid = params.get("id");
//console.log(cid)
let url = main_url+"courses/" + cid + "?addedBy=" + adminId;

fetch(url)
  .then((response) => response.json())
  .then((data) => {
    course_title.value = data.title;
    course_image.value = data.image;
    course_price.value = data.price;
  });
const uplactList = async (cid) => {
  let lac_list = await fetchData(main_url+'course_lacture?courseId=' + cid);
  //console.log(lac_list);
  let up_lact_list = document.querySelector("#up_lact_list");
  let html = ``;
  let lact_count = 99899777;
  lac_list.map((item) => {
    lact_count++;
    html += `<div class="mt-4 lacture_${lact_count}">
                    <div class="flex justify-between border-b pb-1 mb-2">
                      <h3>Lacture</h3>
                      <div>
                       <button class="bg-green-400 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline text-xs" type="button" onclick="updateLacture(${item.id},${item.courseId})">
                          Update
                        </button>
                       <button class="bg-red-400 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline text-xs" type="button" onclick="deleteLacture(${lact_count},${item.id})">
                          Remove
                        </button>
                      </div>
                    </div>
                    <div class="mb-4">
                      <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                        Lacture Title
                      </label>
                      <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="lact_title_${item.id}" type="text" placeholder="Lecture Title" name="" value="${item.title}">
                    </div>
                    <div class="mb-4">
                      <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                        Lacture video
                      </label>
                      <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="lact_video_${item.id}" type="text" placeholder="Lecture Video" name="" value="${item.video}">
                    </div>
                    <div>
                      <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                        Lacture Discription
                      </label>
                      <textarea class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="lact_desc_${item.id}" type="text" placeholder="Lecture Title" name="">${item.desc}</textarea>
                    </div>
                    </div>`;
  });
  up_lact_list.innerHTML = html;
}
uplactList(cid);


/************ UPDATE LACTURE  ******************/
const updateLacture = async (lid, cid) => {
  let url = main_url+'course_lacture/' + lid;
  let lact_title = document.querySelector("#lact_title_" + lid);
  let lact_video = document.querySelector("#lact_video_" + lid);
  let lact_desc = document.querySelector("#lact_desc_" + lid);
  let data = {
    courseId: cid,
    title: lact_title.value,
    video: lact_video.value,
    desc: lact_desc.value
  }
  let res = await updateData(url, data);
  alert("updated");
  lact_title = res.title;
  lact_desc = res.desc;
  lact_video.value = res.video;
}

/************ DELETE LACTURE ***********/
const deleteLacture = async (lac_count, lid) => {
  let url = main_url+"course_lacture/" + lid;
  document.querySelector('.lacture_' + lac_count).remove();
  await deleteRecord(url);
  alert("deleted")
}

/*************** UPDATE COURSE ****"********/
const updateCourse = async () => {
  let url = main_url+"courses/" + cid;
  let data = getCourseInput();
  let res = await updateData(url, data);
  course_image.value = res.image;
  course_price.value = res.price;
  course_title.value = res.title;
  await lactureAdd(cid);
  alert("Course Updated successful");
}
}

/**************** LOGIN CODE HERE ********/
let login_btn= document.querySelector("#login_btn");

login_btn.addEventListener("click",async ()=>{
  let login_pass= document.querySelector("#login_pass").value;
  let login_email=document.querySelector("#login_email").value;
  if(login_pass!=""&& login_pass!=""){
   let url= main_url+`admins?email=${login_email}&password=${login_pass}`;
 let data=  await fetchData(url);
   console.log(data);
  }
});



// Set a Cookie
function setCookie(cName, cValue, expDays) {
  let date = new Date();
  date.setTime(date.getTime() + (expDays * 24 * 60 * 60 * 1000));
  const expires = "expires=" + date.toUTCString();
  document.cookie = cName + "=" + cValue + "; " + expires + "; path=/";
}

// Apply setCookie
