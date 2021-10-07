# BattManage

BattManage is a selfhosted tool to manage your batteries !
![](https://send.papamica.fr/f.php?h=2JULxRMR&p=1)

## Demo

=> [Demo here](https://battmanage-demo.papamica.com) <=

## Installation

Use the docker-compose file to start MongoDB and BattManage.

```bash
git clone https://github.com/PAPAMICA/BattManage.git
cd BattManage
docker-compose up -d
```

## How to use

### App

Application is available on : `localhost:4001/`

### API

- Batteries API is exposed on :

```bash
(GET): localhost:4001/api/batteries
(GET): localhost:4001/api/battery/<batteryId>
(POST): localhost:4001/api/batteries
(PUT): localhost:4001/api/battery/<batteryId>
(DELETE): localhost:4001/api/battery/<batteryId>
```

- Logs API is exposed on :

```bash
(GET): localhost:4001/api/logs
(GET): localhost:4001/api/log/<logId>
(POST): localhost:4001/api/logs
(PUT): localhost:4001/api/log/<logId>
(DELETE): localhost:4001/api/log/<logId>
```

## To Do

- Make graphics work
- Resolving small display issues
- QRCode generation ✅ (23/09/2021)
- Label generation ✅ (24/09/2021)
- Manufacturer logo management
- Next Battery to use ✅ (24/09/2021)
- Generate Report
- Table settings (display by group, page)
- Profile by qwad
- Login ?
- Application ?

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)

If my work has been useful to you, do not hesitate to offer me a strawberry milk 😃

[!["Buy Me A Coffee"](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://www.buymeacoffee.com/PAPAMICA)
