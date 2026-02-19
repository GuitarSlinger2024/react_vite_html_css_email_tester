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
      >
        <h1>Settings</h1>
        <p>This UI is currently under constructions</p>
      </div>
    </section>
  )
}

export default Settings
