# Google Sheets Booking Tracker Setup

Since we are not using a backend server, we will use **Google Apps Script** to receive the booking data and save it to a Google Sheet.

### Step 1: Create the Google Sheet
1. Go to [sheets.google.com](https://sheets.google.com) and create a new sheet.
2. Name it **"ReadyCleans Bookings"**.
3. In the first row (Header), add these exact column names:
   - **A1**: Timestamp
   - **B1**: Status
   - **C1**: Name
   - **D1**: Email
   - **E1**: Phone
   - **F1**: Address
   - **G1**: Service
   - **H1**: Unit Size
   - **I1**: Add-ons
   - **J1**: Date
   - **K1**: Time
   - **L1**: Total Price

### Step 2: Create the Script
1. Inside the Google Sheet, go to **Extensions** > **Apps Script**.
2. Delete any code in the `Code.gs` file and paste the following:

```javascript
/* 
 * Booking Handler for ReadyCleans
 * Receives JSON data and appends to Sheet
 */

function doPost(e) {
  return handleRequest(e);
}

function handleRequest(e) {
  // 1. Lock to prevent concurrent edit issues
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    // 2. Parse Data
    var data = JSON.parse(e.postData.contents);
    var doc = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = doc.getSheets()[0];

    // 3. Format Data for Columns
    // [Timestamp, Status, Name, Email, Phone, Address, Service, Unit, Addons, Date, Time, Price]
    var row = [
      new Date(),
      data.paymentStatus || 'Pending',
      data.contact?.firstName + " " + data.contact?.lastName,
      data.contact?.email,
      data.contact?.phone,
      data.location?.address + ", " + data.location?.city + " " + data.location?.zip,
      data.serviceType,
      data.unitSize,
      (data.addOns || []).join(", "),
      data.date?.toDateString ? data.date : new Date(data.date).toDateString(), // Handle string or date obj
      data.time,
      "$" + (data.total || 0)
    ];

    // 4. Append to Sheet
    sheet.appendRow(row);

    // 5. Return Success
    return ContentService
      .createTextOutput(JSON.stringify({ "result": "success", "row": sheet.getLastRow() }))
      .setMimeType(ContentService.MimeType.JSON)
      .setHeader("Access-Control-Allow-Origin", "*");

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ "result": "error", "error": error.toString() }))
      .setMimeType(ContentService.MimeType.JSON)
      .setHeader("Access-Control-Allow-Origin", "*");
      
  } finally {
    lock.releaseLock();
  }
}

// Handle Pre-flight OPTIONS request for CORS
function doOptions(e) {
  var output = ContentService.createTextOutput("");
  output.setMimeType(ContentService.MimeType.TEXT);
  output.setHeader("Access-Control-Allow-Origin", "*");
  output.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
  output.setHeader("Access-Control-Allow-Headers", "Content-Type");
  output.setHeader("Access-Control-Max-Age", "86400");
  return output;
}
```

### Step 3: Deploy as Web App (CRITICAL)
1. Click the blue **Deploy** button > **New deployment**.
2. Click the specific **"Select type"** gear icon > **Web app**.
3. **Description**: "Booking API".
4. **Execute as**: **"Me (your email)"**.
5. **Who has access**: **"Anyone"** (This is important, otherwise the website cannot send data to it).
6. Click **Deploy**.
7. **Authorize Access**: You will be asked to give permission.
   - Click "Review permissions".
   - Choose your account.
   - You might see "Google hasn't verified this app" (since you just wrote it). Click **Advanced** > **Go to Untitled project (unsafe)**. It is safe, it's your own code.
   - Click **Allow**.
8. **Copy the "Web App URL"**. It will look like `https://script.google.com/macros/s/.../exec`.

### Step 4: Update Your Code
Provide this URL to me, or paste it into the `GOOGLE_SHEETS_URL` variable I have set up in `BookingPage.tsx`.
