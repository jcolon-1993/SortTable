// Declare compare object
var compare =
{
  // Add a method called name
  name: function(a, b)
  {
    // Remove "The" from start of parameter
    a = a.replace(/^the /i, "");
    b = b.replace(/^the /i, "");

    // If value a is less than value b, return -1
    if (a < b)
    {
      return -1;
    }
    // Otherwise, if a is greater than b return 1. If they are the same return 0
    else
    {
      return a > b ? 1 : 0;
    }
  },

  // Add a method called duration
  duration: function(a, b)
  {
    // Split the time at the colon
    a = Number(a[0]) * 60 + Number(a[1]);
    a = Number(b[0]) * 60 + Number(b[1]);

    // Return a - b
    return a - b;
  },
  // Add a method called date
  date: function(a, b)
  {
    // New date object to hold the date
    a = new Date(a);
    b = new Date(b);

    // Return a minus b
    return a - b;
  }
};

// Loop through each element that has a class attribute with a value of sortable
$(".sortable").each(function()
{
  // References current table
  var $table = $(this);
  // Store table body
  var $tbody = $table.find("tbody");
  // Store table headers
  var $controls = $table.find("th");
  // Store array containing rows
  var rows = $tbody.find("tr").toArray();

  // When user clicks on a header
  $controls.on("click", function()
  {
    // Get the header
    var $header = $(this);
    // Get value of data-sort attribute
    var order = $header.data("sort");
    // Declare variable called columns
    var column;

    // If selected item has ascending or descending class, reverse contents
    if ($header.is(".ascending")  || $header.is(".descending"))
    {
      // Toggle to other class
      $header.toggleClass("ascending descending");
      // Reverse the array
      $tbody.append(rows.reverse());
    }
    // Otherwise perform a sort
    else
    {
      // Add class to header
      $header.addClass("ascending");
      // Remove asc or desc from all other headers
      $header.siblings().removeClass("ascending descending");


    // If compare object has method
    if (compare.hasOwnProperty(order))
    {
      // Search for column's index Number
      column = $controls.index(this);

      // Call sort() on rows array
      rows.sort(function(a, b)
      {
        // Call text of columns in row a and b
        a = $(a).find("td").eq(column).text();
        b = $(b).find("td").eq(column).text();
        // Call compare method
        return compare[order](a, b);
      });
      $tbody.append(rows);
    }
  }
  });
});
