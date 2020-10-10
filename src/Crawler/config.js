const userAgent = 'Mozilla/4.0 (compatible; MSIE 5.5; Windows NT)'
let params = {url : "https://www.zarya.info/Diaries/Launches/Launches.php?year=",
    method : "get",
    json : true,
    headers: {
     "User-Agent" : userAgent,
    },
    body : ""
   }

exports.config = {params}