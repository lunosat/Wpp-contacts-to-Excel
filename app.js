const { WAConnection, MessageType } = require('@adiwajshing/baileys')
const Excel = require('exceljs')



async function connectToWhatsApp () {
    const conn = new WAConnection() 
    const workbook = new Excel.Workbook()
    const worksheet = workbook.addWorksheet("WppToExcel")
   

    worksheet.columns = [
        {header: 'Números', key: 'number', width: 40},
    ]
    
    conn.on('chats-received', async ({ hasNewChats }) => {
        let chats = conn.chats.all()
        
        for (let id of chats) {
            if(id.jid.includes('@s.whatsapp.net')){
                const num = id.jid.split('@')
                worksheet.addRow({number: num[0]})
            }
            await workbook.xlsx.writeFile('numbers.xlsx')
            console.log('Arquivo criado com sucesso!')
        }
    })
    await conn.connect ()
}


connectToWhatsApp ()
.catch (err => console.log("unexpected error: " + err) ) 