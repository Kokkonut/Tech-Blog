module.exports = {
    format_date: (date) => {
      // Format date as MM/DD/YYYY
      return date.toLocaleDateString();
    },
  
    format_time: (postedTime) => {
      let currentTime = new Date();
      let timeElapsed = Math.floor((currentTime - postedTime) / 1000);
    
      if (timeElapsed < 60) {
        return `${timeElapsed} seconds ago`;
      } else if (timeElapsed >= 60 && timeElapsed < 3600) {
        let minutes = Math.floor(timeElapsed / 60);
        return `${minutes} minutes ago`;
      } else if (timeElapsed >= 3600 && timeElapsed < 86400) {
        let hours = Math.floor(timeElapsed / 3600);
        return `${hours} hours ago`;
      } else {
        let days = Math.floor(timeElapsed / 86400);
        return `${days} days ago`;
      }
    }
    
  };