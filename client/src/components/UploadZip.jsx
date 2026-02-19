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
      ></div>
    </section>
  )
}

export default UploadZip