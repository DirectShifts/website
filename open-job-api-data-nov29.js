jQuery(document).ready(function () {
    const apiCall = function (args) {
    jQuery.ajax({
      url: "https://app.directshifts.com/jobs/p/list.json",
      async: true,
      data: args,
      crossDomain: true,
      success: function (result) {
        let root = document.getElementById("root");
        let html = "";
        if(result.jobs != ''){
        for (let i = 0; i < result.jobs.length; i++) {
        let specialty_names_str = result.jobs[i].specialty_names;
        let specialty_names_arr = specialty_names_str.split(",");
        let specialty_names_html = '';
          for(let k = 0; k < specialty_names_arr.length; k++){
            specialty_names_html += `<span class="jl-sn-inr-items">${specialty_names_arr[k]}</span>`;
          }

        let practice_type_obj = result.jobs[i].practice_type;
        let practice_type_html = '';
          for (const [key, value] of Object.entries(practice_type_obj)) {
            practice_type_html += `<div class="jl-location tagPracticType"><img src="https://uploads-ssl.webflow.com/5abebcf1b3e0cb4bb9718bba/65311dbc9af4d1961b089354_Outpatient.svg"/><span><span class="jl-pt-inr-items">${value}</span></span></div>`;
          }
        let pratciceType = result.jobs[i].practice_type;
        var pratciceTypeElement = pratciceType ? `<div class="jl-location tagPracticType"><img src="https://uploads-ssl.webflow.com/5abebcf1b3e0cb4bb9718bba/65311dbc9af4d1961b089354_Outpatient.svg"/><span><span class="jl-pt-inr-items">${result.jobs[i].practice_type}</span></span></div>`: '';

        let hotJob = result.jobs[i].hot;
        let name = result.jobs[i].title;
        //console.log(name, hotJob);
        var hotJobElement = hotJob === true ? '<div id="hotJob"><div class="ht-inner"><img src="https://uploads-ssl.webflow.com/5abebcf1b3e0cb4bb9718bba/652d3b92927905d052de6d4e_Hot%20job.svg"><span class="hot-job-txt">Hot Job</span><span class="tooltip">Our newest and fast-filling opportunities</span></div></div>' : '';

        var shareBtnId = 'shareBtn' + i;
        var windowUrl = window.location.href;
          function getParameterByName(name) {
              name = name.replace(/[\[\]]/g, "\\$&");
              var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
                  results = regex.exec(windowUrl);
              if (!results) return null;
              if (!results[2]) return '';
              return decodeURIComponent(results[2].replace(/\+/g, " ")) || null; // Handle empty values
          }

        var utmSource = getParameterByName('utm_source');
        var utmMedium = getParameterByName('utm_medium');
        var utmCampaign = getParameterByName('utm_campaign');
        var utmContent = getParameterByName('utm_content');
        var currentDate = new Date();
        var utmContentDate = ('0' + (currentDate.getMonth() + 1)).slice(-2) + ('0' + currentDate.getDate()).slice(-2) + currentDate.getFullYear();
        var getUtmCon;
        if (utmContent === null || utmContent === '') {
            var month = ('0' + (currentDate.getMonth() + 1)).slice(-2);
            var day = ('0' + currentDate.getDate()).slice(-2);
            var year = currentDate.getFullYear();
            getUtmCon = month + day + year; // Format the date as a string "MMDDYYYY"
        } else {
            getUtmCon = utmContent;
        }
        var getNewUtmCon = getUtmCon ? getUtmCon : utmContentDate;
        var mktwebsite = 'mkt-website';
        var getUtmScr = utmSource ? utmSource : mktwebsite;
        var mktPageTitle = 'open-jobs';
        var getMktPageTitle = utmMedium ? utmMedium : mktPageTitle;
        var mktSignBtn = 'sign-up';
        var getMktSignBtn = utmCampaign ? utmCampaign : mktSignBtn;
        var mktDownBtn = 'download-now';
        var getMktDownBtn = utmCampaign ? utmCampaign : mktDownBtn;
        var originalTitle = result.jobs[i].title;
        var modifiedTitle = originalTitle.toLowerCase().replace(/ /g, '-');
        var getUtmVal = utmSource && utmMedium && utmCampaign ? `<a target="_blank" class="btn-applynow" href="https://app.directshifts.com/jobs/p/${result.jobs[i].slug}?utm_source=${utmSource}&utm_medium=${utmMedium}&utm_campaign=${utmCampaign}&utm_content=${getNewUtmCon}">Apply Now</a>` : `<a target="_blank" class="btn-applynow" href="https://app.directshifts.com/jobs/p/${result.jobs[i].slug}?utm_source=mkt-website&utm_medium=${getMktPageTitle}&utm_campaign=apply-now&utm_content=${utmContentDate}">Apply Now</a>`;
        var titleUtmVal = utmSource && utmMedium && utmCampaign ? `<a target="_blank" class="data-link" href="https://app.directshifts.com/jobs/p/${result.jobs[i].slug}?utm_source=${utmSource}&utm_medium=${utmMedium}&utm_campaign=${utmCampaign}&utm_content=${getNewUtmCon}">${result.jobs[i].title}</a>` : `<a target="_blank" class="data-link" href="https://app.directshifts.com/jobs/p/${result.jobs[i].slug}?utm_source=mkt-website&utm_medium=${getMktPageTitle}&utm_campaign=${modifiedTitle}&utm_content=${utmContentDate}">${result.jobs[i].title}</a>`;
        html += `<tr>
            <td>
                ${hotJobElement}
                <div class="jl-title-wrap">
                <div class="jl-title">
                  ${titleUtmVal}
                <div class="jl-main-head">
                <div class="jl-location">
                    <img src="https://uploads-ssl.webflow.com/5abebcf1b3e0cb4bb9718bba/65311dbaacbd338000fedc41_Brooklyn.svg"/>
                    <span>${result.jobs[i].city},</span> <span>${result.jobs[i].state_code}</span>
                </div>
                <div class="jl-location jl-location shift-${result.jobs[i].shift_type}">
                    <span>${result.jobs[i].shift_type} Shift</span>
                </div>
                <div class="jl-location shift-${result.jobs[i].hours_per_shift}">
                    <img src="https://uploads-ssl.webflow.com/5abebcf1b3e0cb4bb9718bba/65311dbaea1efcd84205eb6a_Hours.svg"/>
                    <span>${result.jobs[i].hours_per_shift} Hours Per Shift</span>
                </div>
                <div class="jl-location shift-${result.jobs[i].category}">
                    <img src="https://uploads-ssl.webflow.com/5abebcf1b3e0cb4bb9718bba/65311dbae442d6e0146492ec_locum.svg"/>
                    <span>${result.jobs[i].category}</span>
                </div>
                ${typeof result.jobs[i].practice_type === "string" ? pratciceTypeElement : practice_type_html}
                </div>
                </div>
                <div class="apply-now-wrap">
                  ${getUtmVal}
                </div>
                </div>
                <div class="jl-types">
                <div class="jl-sn-wrapper">
                  <div class="jl-sn">
                    ${specialty_names_html}
                  </div>
                  <div class="more-link" style="display: none;">More</div>
                </div>
                <div class="shareBtn">
                    <div class="share_box">
                        <img src="https://uploads-ssl.webflow.com/5abebcf1b3e0cb4bb9718bba/652d3b992fcd0945fc55e4c4_Share.svg"/>
                        <span id="${shareBtnId}" class="shareBtnClick">Share</span>
                    </div>
                </div>
                </div>
            </td>
        </tr>`;

        if (i === 4){ html += `<tr class="desktopSign cstom1 mobile-apps-1"><td colspan="2"><div class="main-content-b"><div class="image-block"><img src="https://uploads-ssl.webflow.com/5abebcf1b3e0cb4bb9718bba/6528d4f538c315ff9443fa72_Sign%20Up%20Banner%20(1).svg" alt="image"></div><div class="right-content"><div class="directshift_regstring"><h4>Make the most of DirectShifts by registering for free!</h4><div class="dirctneq"><ul><li><img src="https://uploads-ssl.webflow.com/5abebcf1b3e0cb4bb9718bba/6528d4f1b3935fbb351447b5_Personalised%20recommendations.svg"><span>Personalised recommendations</span></li><li><img src="https://uploads-ssl.webflow.com/5abebcf1b3e0cb4bb9718bba/6528d4f18c8705e97403803c_Get%20support%20at%20every%20step.svg"><span>Get support at every step</span></li><li><img src="https://uploads-ssl.webflow.com/5abebcf1b3e0cb4bb9718bba/6528d4f1e4171f39a0ede315_Boost%20visibility%20with%20employers%20.svg"><span>Real-time updates</span></li><li><img src="https://uploads-ssl.webflow.com/5abebcf1b3e0cb4bb9718bba/6528d4f27031cb2307405bbf_Real-time%20updates.svg"><span>Boost visibility with employers</span></li></ul></div><div class="dirctregstrbtn"><a href="https://www.directshifts.com/sign-up?utm_source=${getUtmScr}&utm_medium=${getMktPageTitle}&utm_campaign=${getMktSignBtn}&utm_content=${getNewUtmCon}">Sign Up</a></div></div></div></div></td></tr>`; }
        if (i === 10){ html += `<tr class="desktopSign cstom2 mobile-apps download-app"><td colspan="2"><div class="main-content-b"><div class="image-block"><img src="https://uploads-ssl.webflow.com/5abebcf1b3e0cb4bb9718bba/653222e09e96e3d3c8cd0db8_ad-2-mockup-img.png" alt="image"></div><div class="right-content"><div class="directshift_regstring"><h4>Find your perfect healthcare job on the go with the DirectShifts App!</h4><div class="dirctneq"><ul class="app-list"><li><img src="https://uploads-ssl.webflow.com/5abebcf1b3e0cb4bb9718bba/653a51ab079dbdf6f28bf20e_Application%20tracking.svg"><span>Application Tracking</span></li><li><img src="https://uploads-ssl.webflow.com/5abebcf1b3e0cb4bb9718bba/653a51abbb28af1d85a86ff7_Document%20mang.svg"><span>Document Management</span></li><li><img src="https://uploads-ssl.webflow.com/5abebcf1b3e0cb4bb9718bba/653a51ab32389852cbc7d0f8_Timesheet%20(1).svg"><span>Seamless Timesheets</span></li><li><img src="https://uploads-ssl.webflow.com/5abebcf1b3e0cb4bb9718bba/653a51aba889c0a4dfba6ddb_Paycheck.svg"><span>Paycheck Tracking</span></li></ul></div><div class="dirctregstrbtn download"><a href="https://www.directshifts.com/directshifts-mobile-app?utm_source=${getUtmScr}&utm_medium=${getMktPageTitle}&utm_campaign=${getMktDownBtn}&utm_content=${getNewUtmCon}">Download Now</a></div></div></div></div></td></tr>`; }

        }

        // pagination start
        let pagination_html = '';
        if(result.total_pages > 1){
        if(result.current_page == 1){
          pagination_html = `<nav class="pagination">
        <span data-value="${result.current_page}" class="current">${result.current_page}</span>
        <span data-value="${result.next_page}" class="pgn-func">${result.next_page}</span>
        <span data-value="${result.current_page + 1}" rel="next" class="pgn-func next">Next</span>
        <span data-value="${result.total_pages}" class="pgn-func last last-1">Last</span>
        </nav>
        `;
        }else if(result.total_pages == result.current_page){
            pagination_html = `<nav class="pagination">
        <span data-value="1" class="pgn-func first">First</span>
        <span data-value="${result.current_page - 1}" class="pgn-func prev">Prev</span>
        <span data-value="${result.prev_page}" class="pgn-func">${result.prev_page}</span>
        <span class="current">${result.current_page}</span>
        </nav>
        `;
        }else{
          pagination_html = `<nav class="pagination">
        <span data-value="1" class="pgn-func first">First</span>
        <span data-value="${result.current_page - 1}" class="pgn-func prev">Prev</span>
        <span data-value="${result.prev_page}" class="pgn-func">${result.prev_page}</span>
        <span class="current">${result.current_page}</span>
        <span data-value="${result.next_page}" class="pgn-func">${result.next_page}</span>
        <span data-value="${result.current_page + 1}" rel="next" class="pgn-func next">Next</span>
        <span data-value="${result.total_pages}" class="pgn-func last last-1">Last</span>
        </nav>
        `;
        }
        }
        jQuery('.api-pagination').html(pagination_html);
        jQuery('.sidebtmlft').removeClass('notFoundResult');
        // pagination end

        //add class 'notFoundResult' for 3 records also
        if(result.jobs.length <= 3){ jQuery('.sidebtmlft').addClass('notFoundResult'); }

        }else{
            html = '<div class="nrfound"><h2>We may have job openings for you, even if it\'s not yet listed!</h2><p>Our job listings are constantly evolving. Connect with us to uncover potential job openings tailored to your needs. We\'re here to help you find the right job for you. </p><a href="https://calendly.com/directshiftsrecruiter/directshifts-recruiter?month=2023-10">Connect with a clinician partner</a></div>';
            jQuery('.sidebtmlft').addClass('notFoundResult');
            jQuery('.api-pagination').html('');
        }
        root.innerHTML = html;
        if (!document.getElementById("lists_state")) {
            // Add States to SearchForm
            let states_html = "";
            for(let j = 0; j < result.states.length; j++){
                states_html += `<label><input type="checkbox" class="api-state" name="state" value="${result.states[j].code}"><span>${result.states[j].code}</span>${result.states[j].name} </label>`;
            }
           jQuery('.apiState').after(`<datalist id="lists_state">${states_html}</datalist>`);
        }
        if (!document.getElementById("lists_city")) {
            // cities
            let cities_html = "";
            for(let j = 0; j < result.cities.length; j++){
                cities_html += `<label><input type="checkbox" class="api-state" name="state" value="${result.cities[j].code}"><span>${result.cities[j].code}</span>${result.cities[j].name} </label>`;
            }
            jQuery('.apiCity').after(`<datalist id="lists_city">${cities_html}</datalist>`);
        }
        // specialties

        let specialties_html = "";
        for (let j = 0; j < result.specialties.length; j++) {
            specialties_html += `<label><input type="checkbox" class="api-speciality" name="specialty_radio" value="${result.specialties[j]}">${result.specialties[j]}</label>`;
        }
        var arg_specialty = getUrlParameter('specialty[]');
        if(!arg_specialty){
            jQuery('.listSpeciality').empty().append(`<input type="text" id="searchSpecialty" placeholder="Specialty"><datalist id="lists_speciality">${specialties_html}</datalist>`);
        }

        if (!document.getElementById("lists_practice_type")) {
            // Practice Types
            let uniquePracticeTypes = ['Emergency Department','Inpatient','Outpatient','Telemedicine','Urgent Care','Correctional','Home Care','Clinic/Office-Based Practice','Addiction Center/Rehab'];

            let practice_type_html = "";
            for(let j = 0; j < uniquePracticeTypes.length; j++){
            practice_type_html += `<label><input type="checkbox" class="api-practice-type" name="practice_types" value="${uniquePracticeTypes[j]}">${uniquePracticeTypes[j]}</label>`;
            }
            jQuery('.listPractice').after(`<datalist id="lists_practice_type">${practice_type_html}</datalist>`);
        }
        // Categories
        if (!document.getElementById("lists_category")) {
            let uniqueCategories = ['Contract','Per-Diem','Permanent'];
            let categories_html = "";
            for(let j = 0; j < uniqueCategories.length; j++){
            categories_html += `<label><input type="checkbox" class="api-category" name="categories" value="${uniqueCategories[j]}">${uniqueCategories[j]}</label>`;
            }
            jQuery('.listCategory').after(`<datalist id="lists_category">${categories_html}</datalist>`);
        }
        // Occupations
        if (!document.getElementById("lists_occupation")) {
            let uniqueOccupations = ['Physician (MD/DO)','Physician Assistant (PA)','Advanced Practice Registered Nurse (APRN, NP, CNS, Midwife, etc.)','Certified Registered Nurse Anesthesist (CRNA)','NurseMidwife','Nurse Specialist/CNS','Registered Nurse (RN)','Licensed Practical Nurse/Licensed Vocational Nurse (LVN, LPN)','Certified Nursing Assistant (CNA)','Patient Care Technician (PCT)','Respiratory, Rehabilitative & Developmental Therapists (OT, PT, etc.)','Technologist (Sonography, Radiology, etc.)','Technician (Radiologic, Cardiovascular, Histo, etc.)','Medical Assistants (CMA, RMA)','Dental Services (DDS, Technician, Hygienist, etc.)','Behavioral Health & Social Work Services (Counselors, Social Workers, etc.)','Dietitians and Nutritionists','Pharmacist','Healthcare Administration'];
            let occupations_html = "";
            for(let j = 0; j < uniqueOccupations.length; j++){
            occupations_html += `<label><input type="radio" class="api-occupation" name="occupations" value="${uniqueOccupations[j]}">${uniqueOccupations[j]}</label>`;
            }
            jQuery('.apiOccupation').after(`<datalist id="lists_occupation">${occupations_html}</datalist>`);
        }
        $(document).ready(function () {
            $('.jl-sn-wrapper').each(function () {
                var $items = $(this).find('.jl-sn-inr-items');
                var $moreLink = $(this).find('.more-link');

                if ($items.length > 2) {
                    var count = $items.length - 2;
                    $items.slice(2).hide();
                    $moreLink.text('+' + count + ' More');
                    $moreLink.show();
                }
                $moreLink.click(function () {
                    $items.slice(2).toggle();
                    $(this).text(function (i, text) {
                        var count = $items.length - 2;
                        return text === '+' + count + ' More' ? '' : '+' + count + ' More';
                    });
                });
            });
        });
        $('.shareBtnClick').on('click', function() {
            var index = $(this).index('.shareBtnClick');
            var name = result.jobs[index].title;
            var link = result.jobs[index].link;
            if (navigator.share) {
            const shareData = {
                title: name,
                url: link
            };
            navigator.share(shareData)
                .then(() => {
                  console.log('Share Successful');
                })
                .catch((error) => {
                  console.error('Share failed:', error);
                });
            } else {
            alert('Web Share not supported');
            }
        });
        $(document).ready(function() {
            function filterDatalist(inputId, datalistId) {
                var input = $("#" + inputId);
                var datalist = $("#" + datalistId);

                input.on("keyup", function() {
                    var filterValue = input.val().toLowerCase();
                    var options = datalist.find("label");
                    options.each(function() {
                        var label = $(this);
                        var labelText = label.text().toLowerCase();
                        if (labelText.indexOf(filterValue) > -1) {
                            label.show();
                        } else {
                            label.hide();
                        }
                    });
                });
            }
            filterDatalist("searchOccupation", "lists_occupation");
            filterDatalist("searchSpecialty", "lists_speciality");
            filterDatalist("searchPractice", "lists_practice_type");
            filterDatalist("searchState", "lists_state");
            filterDatalist("searchCat", "lists_category");
        });

      },
    });
  }; //apiCall function end

//   Call function when page loads
  const queryString = window.location.search;
  if(queryString){
    const urlParams = new URLSearchParams(queryString);
    const query_params = Object.fromEntries(urlParams);

    var occupation_ar = [];
    var specialty_ar = [];
    var state_ar = [];
    var practice_type_ar = [];
    var category_ar = [];

    // var occupation = getUrlParameter("occupation[]");
    // if(occupation != false){
    //     // occupation_ar = occupation.split(",");
    //     // occupation_ar = occupation_ar.map(function(value){ return value.replace(/\+/g," "); })
    //     occupation_ar = occupation.replace(/\+/g," ");
    // }

    var occupation = getUrlParameterLoad("occupation[]");
    if (occupation !== false) {
         //occupation_ar = occupation.split(",");
         //occupation_ar = occupation_ar.map(function(value){ return value.replace(/\+/g," "); })
        occupation_ar = occupation.replace(/\+/g," ");
        //alert(occupation_ar);
    }

    var specialty = getUrlParameterLoad("specialty[]");
    if (specialty !== false) {
       specialty_ar = specialty.split(",");
       specialty_ar = specialty_ar.map(function(value){ return value.replace(/\+/g," "); });
        //specialty_ar = specialty.replace(/\+/g," ");
        //alert(specialty_ar);
    }
    var state = getUrlParameterLoad("state[]");
    if(state != false){
        state_ar = state.split(",");
        state_ar = state_ar.map(function(value){ return value.replace(/\+/g," "); })
    }
    var practice_type = getUrlParameterLoad("practice_type[]");
    if(practice_type != false){
        practice_type_ar = practice_type.split(",");
        practice_type_ar = practice_type_ar.map(function(value){ return value.replace(/\+/g," "); })
    }

    var category = getUrlParameterLoad("category[]");
    if(category != false){
        category_ar = category.split(",");
        category_ar = category_ar.map(function(value){ return value.replace(/\+/g," "); })
    }

    apiCall({ category: category_ar, state: state_ar, occupation: occupation_ar, specialty: specialty_ar, practice_type: practice_type_ar });
    // apiCall(query_params);
  }else{
     apiCall();
  }


   //Search jobs
    jQuery(document).on("click", "datalist input", function () {
        let checkboxCount = jQuery('input[type="checkbox"]:checked').length;
        let radioCount = jQuery('input[type="radio"]:checked').length;
        let totalCount = checkboxCount + radioCount;
        jQuery("#checked-count").text("Applied (" + totalCount + ")");
        if(jQuery(this).hasClass('api-occupation')){
            let i = getSelectedValues(".api-occupation:checked");
            r = new URL("https://www.directshifts.com/open-jobs");
            if (i.length) r.searchParams.set("occupation[]", i.join("&"));
            window.history.pushState(null, "", r.toString());
            $( "ul.search_fields li:nth-child(2)").find("div.card-header").trigger("click");
            apiCall({ occupation: i });
        } else {
        let t = getSelectedValues(".api-state:checked"),
            s = getSelectedValues(".api-city:checked"),
            i = getSelectedValues(".api-occupation:checked"),
            n = getSelectedValues(".api-speciality:checked"),
            l = getSelectedValues(".api-category:checked"),
            c = getSelectedValues(".api-practice-type:checked");

            r = new URL("https://www.directshifts.com/open-jobs");
            if (t.length) r.searchParams.set("state[]", t.join(","));
            if (s.length) r.searchParams.set("city[]", s.join(","));
            if (i.length) r.searchParams.set("occupation[]", i.join(","));
            if (n.length) r.searchParams.set("specialty[]", n.join(","));
            if (l.length) r.searchParams.set("category[]", l.join(","));
            if (c.length) r.searchParams.set("practice_type[]", c.join(","));

            window.history.pushState(null, "", r.toString());
            apiCall({ state: t, city: s, occupation: i, specialty: n, category: l, practice_type: c });
        }
    });
    function getSelectedValues(selector) {
        return jQuery(selector).map(function () {
            return this.value;
        }).get();
    }
    jQuery("#clear-all-button").on("click", function () {
        jQuery('input[type="checkbox"]').prop("checked", !1);
        let a = new URL("https://www.directshifts.com/open-jobs");
        a.searchParams.delete("state"),
            a.searchParams.delete("city"),
            a.searchParams.delete("occupation"),
            a.searchParams.delete("specialty"),
            a.searchParams.delete("category"),
            a.searchParams.delete("practice_type"),
            window.history.pushState(null, "", a.toString()),
            apiCall({ state: null, city: null, occupation: null, specialty: null, category: null, practice_type: null }),
            jQuery("#checked-count").text("Applied (0)");
    }),
    jQuery(document).on("click", "span.pgn-func", function () {
            var occupation_ar = [];
            var specialty_ar = [];
            var state_ar = [];
            var practice_type_ar = [];
            var category_ar = [];
            var c = jQuery(this).attr("data-value");

            var occupation = getUrlParameterClick("occupation[]");
            if(occupation != false){
                //occupation_ar = occupation.split(",");
                //occupation_ar = occupation_ar.map(function(value){ return value.replace(/\+/g," "); })
                occupation_ar = occupation.replace(/\+/g," ");
            }

            var specialty = getUrlParameterClick("specialty[]");
            if(specialty != false){
                specialty_ar = specialty.split(",");
                specialty_ar = specialty_ar.map(function(value){ return value.replace(/\+/g," "); })
            }

            var state = getUrlParameterClick("state[]");
            if(state != false){
                state_ar = state.split(",");
                state_ar = state_ar.map(function(value){ return value.replace(/\+/g," "); })
            }
            var practice_type = getUrlParameterClick("practice_type[]");
            if(practice_type != false){
                practice_type_ar = practice_type.split(",");
                practice_type_ar = practice_type_ar.map(function(value){ return value.replace(/\+/g," "); })
            }

            var category = getUrlParameterClick("category[]");
            if(category != false){
                category_ar = category.split(",");
                category_ar = category_ar.map(function(value){ return value.replace(/\+/g," "); })
            }

            apiCall({ state: state_ar, occupation: occupation_ar, specialty: specialty_ar, category: category_ar, practice_type: practice_type_ar, page: c });
    });
    $(document).ready(function () {
     if (window.innerWidth < 767) {
        $('#api-job-listing').hide();
           var mobileDiv = $('<div class="mobile_filter"><h3>Filter Jobs</h3></div>');
             $('#api-job-listing').before(mobileDiv);
               mobileDiv.click(function() {
                  $('.mobile_filter').toggleClass('mactive');
                  $('#api-job-listing').slideToggle();
              });
       }
    });
});
const clearAllButton = document.getElementById("clear-all-button");
const occTriggerH4 = document.getElementById("occ_trigger");
clearAllButton.addEventListener("click", function() {
      const clickEvent = new Event("click", {
        bubbles: true,
        cancelable: true
      });
      occTriggerH4.dispatchEvent(clickEvent);
});
var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = decodeURIComponent(sPageURL).split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
    return false;
};

var getUrlParameterLoad = function(param) {
    var url = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    url = url.map(function(param) {
        return decodeURIComponent(param.replace(/\+/g, ' '));
    });
    for (var i = 0; i < url.length; i++) {
        var paramPair = url[i].split('=');
        if (paramPair[0] === param) {
            if (paramPair.length === 2) {
                return paramPair[1];
            } else {
                return paramPair.slice(1);
            }
        }
    }
    return false;
};


var getUrlParameterClick = function(param) {
    var url = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    url = url.map(function(param) {
        return decodeURIComponent(param.replace(/\+/g, ' '));
    });
    for (var i = 0; i < url.length; i++) {
        var paramPair = url[i].split('=');
        if (paramPair[0] === param) {
            if (paramPair.length === 2) {
                return paramPair[1];
            } else {
                return paramPair.slice(1);
            }
        }
    }
    return false;
};
