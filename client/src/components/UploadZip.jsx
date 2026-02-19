function UploadZip({currentDiv}) {
  return (
    <section
      className="uploadZip"
      id="uploadZip"
    >
      <div
        className={`uploadZip-inner ${
          currentDiv !== 'uploadZip' ? 'hideThisDiv' : ''
        }`}
      >

        <h1>Upload Zipfile</h1>
        <p>This might not be use at all because the app is meant for developers who can work with this in a local server of some kind.</p>

      </div>
    </section>
  )
}

export default UploadZip