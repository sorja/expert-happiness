import React from 'react'

export default ({onClickSubmit, onChange, fields}) =>
    <form onSubmit={onClickSubmit} >
        <h2> Uusi </h2>
        <div>
            <label htmlFor="newName">nimi</label>
            <input
                value={fields.newName}
                type="text"
                id="newName"
                name="newName"
                onChange={onChange}
                placeholder="Nimi" />
        </div>

        <div>
            <label htmlFor="newTel">numero</label>
            <input
                value={fields.newTel}
                type="text"
                id="newTel"
                name="newTel"
                onChange={onChange}
                placeholder="Numero" />
        </div>

        <div>
            <button type="submit">lisää</button>
        </div>

    </form>