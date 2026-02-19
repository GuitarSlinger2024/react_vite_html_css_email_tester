function Settings({currentDiv}) {
  return (
    <section
      className="settings"
      id="settings"
    >
      <div
        className={`settings-inner ${
          currentDiv !== 'settings' ? 'hideThisDiv' : ''
        }`}
      ></div>
    </section>
  )
}

export default Settings
