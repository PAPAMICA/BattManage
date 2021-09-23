const template = (data) => (
`<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no">
    <title>BattManage | <%= battery.Name %></title>
    <link rel="icon" type="image/png" sizes="50x50" href="../assets/img/logo-batmanage.png">
    <link rel="icon" type="image/png" sizes="50x50" href="../assets/img/logo-batmanage.png">
    <link rel="icon" type="image/png" sizes="50x50" href="../assets/img/logo-batmanage.png">
    <link rel="icon" type="image/png" sizes="50x50" href="../assets/img/logo-batmanage.png">
    <link rel="icon" type="image/png" sizes="50x50" href="../assets/img/logo-batmanage.png">
    <link rel="stylesheet" href="../assets/bootstrap/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i">
    <link rel="stylesheet" href="../assets/fonts/fontawesome-all.min.css">
    <link rel="stylesheet" href="../assets/fonts/font-awesome.min.css">
    <link rel="stylesheet" href="../assets/fonts/typicons.min.css">
    <link rel="stylesheet" href="../assets/fonts/fontawesome5-overrides.min.css">
    <link rel="stylesheet" href="../assets/css/untitled.css">
</head>

<body id="page-top">
    <div id="wrapper">
        <nav class="navbar navbar-dark align-items-start sidebar sidebar-dark accordion bg-gradient-primary p-0">
            <div class="container-fluid d-flex flex-column p-0"><a class="navbar-brand d-flex justify-content-center align-items-center sidebar-brand m-0" href="/">
                    <div class="sidebar-brand-icon rotate-n-15"><i class="fas fa-car-battery"></i></div>
                    <div class="sidebar-brand-text mx-3"><span>BatTManage</span></div>
                </a>
                <hr class="sidebar-divider my-0">
                <ul class="navbar-nav text-light" id="accordionSidebar">
                    <li class="nav-item"><a class="nav-link" href="/"><i class="fas fa-tachometer-alt" style="width: 20px;"></i><span>Dashboard</span></a></li>
                    <li class="nav-item"></li>
                    <li class="nav-item"><a class="nav-link active" href="/batt-informations"><i class="fas fa-battery-half" style="width: 20px;"></i><span>Battery Informations<br></span></a><a class="nav-link" href="/inventory"><i class="fas fa-clipboard-check" style="width: 20px;margin-right: 0px;margin-left: 3px;"></i><span>Inventory<br></span></a></li>
                    <li class="nav-item"></li>
                    <li class="nav-item"></li>
                </ul>
                <div class="text-center d-none d-md-inline"><button class="btn rounded-circle border-0" id="sidebarToggle" type="button"></button></div>
            </div>
        </nav>
        <div class="d-flex flex-column" id="content-wrapper">
            <div id="content">
                <div class="container-fluid">
                    <h3 class="text-dark mb-4" style="margin-top: 10px;">Battery Informations</h3>
                    <div class="row">
                        <div class="col-auto" style="width: 250px;">
                        <form method="POST" id="tableForm" action="/batt-informations/getJson">
                            <select name="battery_name" class="form-select-lg align-items-xxl-center" style="font-size: 17px;border-color: rgb(247,247,247);max-width: 100%;">                             
                                    <% for(var i = 0; i < batteries.length; i++) { %>
                                    <option value="<%= batteries[i].Name %>" selected=""><%= batteries[i].Name %> <%= batteries[i].Brand %> <%= batteries[i].Cells %> <%= batteries[i].Capacity %> mah</option>
                                    <% } %>  
                            </select>
                            <button type="submit" class="btn btn-primary" type="button" style="margin-left: 5px; position: absolute; float: left;"><i class="fas fa-fire"></i></button>
                        </form>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-auto" style="padding-top: 3px;width: 220px;">
                        <form method="GET" action="/batteries/${data.bID}/edit" enctype="application/x-www-form-urlencoded">
                        <button type="submit" class="btn btn-primary" type="button" style="width: 200px;"><i class="fa fa-edit" style="margin-right: 8px;"></i>Edit</button>
                        </form></div>
                        <div class="col-auto" style="padding-top: 3px;width: 220px;">
                        <form method="POST" action="/batteries/${data.bID}/charged" enctype="application/x-www-form-urlencoded">
                        <button type="submit" class="btn btn-primary" type="button" style="background: var(--bs-green);border-color: var(--bs-green);margin-right: -1px;width: 200px;"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" class="bi bi-battery-charging" style="width: 20px;height: 20px;margin-right: 9px;">
                                    <path d="M14.5 9.5a1.5 1.5 0 0 0 0-3v3z"></path>
                                    <path fill-rule="evenodd" d="M9.585 2.568a.5.5 0 0 1 .226.58L8.677 6.832h1.99a.5.5 0 0 1 .364.843l-5.334 5.667a.5.5 0 0 1-.842-.49L5.99 9.167H4a.5.5 0 0 1-.364-.843l5.333-5.667a.5.5 0 0 1 .616-.09z"></path>
                                    <path fill-rule="evenodd" d="M6.332 4H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h2.072l.307-1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h3.391l.941-1zM4.45 6H2v4h1.313a1.5 1.5 0 0 1-.405-2.361L4.45 6zm.976 5l-.308 1H6.96l.21-.224h.001l.73-.776H6.53l-.085.09.028-.09H5.426zm1.354-1H5.733l.257-.833H4a.5.5 0 0 1-.364-.843l.793-.843L5.823 6h1.373L5.157 8.167h1.51a.5.5 0 0 1 .478.647L6.78 10zm.69 0h1.374l1.394-1.482.793-.842a.5.5 0 0 0-.364-.843h-1.99L8.933 6H7.887l-.166.54-.199.646A.5.5 0 0 0 8 7.833h1.51L7.47 10zm.725-5H9.24l.308-1H7.706l-.942 1h1.374l.085-.09-.028.09zm2.4-1l-.308 1H12a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H9.276l-.942 1H12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.405zm-.378 6H12V8.02a1.499 1.499 0 0 1-.241.341L10.217 10zM12 6.646V6h-.646a1.5 1.5 0 0 1 .646.646z"></path>
                                </svg>Charge</button>
                                </form></div>
                        <div class="col-auto" style="padding-top: 3px;width: 220px;">
                        <form method="POST" action="/batteries/${data.bID}/used" enctype="application/x-www-form-urlencoded">
                        <button type="submit" class="btn btn-primary" type="button" style="background: var(--bs-orange);border-color: var(--bs-orange);width: 200px;"><i class="fas fa-rocket" style="margin-right: 8px;"></i>Used</button></form></div>
                        <div class="col-auto" style="padding-top: 3px;width: 220px;">
                        <form method="POST" action="/batteries/${data.bID}/storage" enctype="application/x-www-form-urlencoded">
                        <button type="submit" class="btn btn-primary" type="button" style="background: var(--bs-yellow);border-color: var(--bs-yellow);width: 200px;"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icon-tabler-package" style="margin-right: 8px;">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                    <polyline points="12 3 20 7.5 20 16.5 12 21 4 16.5 4 7.5 12 3"></polyline>
                                    <line x1="12" y1="12" x2="20" y2="7.5"></line>
                                    <line x1="12" y1="12" x2="12" y2="21"></line>
                                    <line x1="12" y1="12" x2="4" y2="7.5"></line>
                                    <line x1="16" y1="5.25" x2="8" y2="9.75"></line>
                                </svg>Storage</button>
                                </form></div>
                                <div class="col-auto" style="padding-top: 3px;width: 220px;">       
                        <form method="POST" action="/batteries/${data.bID}/hs" enctype="application/x-www-form-urlencoded">
                            <button type="submit" class="btn btn-primary" type="button" style="background: var(--bs-red);border-color: var(--bs-red);width: 200px;"><i class="fas fa-dumpster-fire" style="margin-right: 8px;"></i>Out of service</button>
                            </form></div>

                        <div class="col-auto" style="padding-top: 3px;width: 220px;">       
                        <form method="POST" action="/batteries/${data.bID}/delete" enctype="application/x-www-form-urlencoded">
                            <button type="submit" class="btn btn-primary" type="button" style="background: var(--bs-red);border-color: var(--bs-red);width: 200px;"><i class="fa fa-trash" style="margin-right: 8px;"></i>Delete</button>
                            </form></div>
                    </div>
                    <div class="row justify-content-center align-items-center" style="margin-top: 19px;">
                        <div class="col-auto"><img class="shadow" src="../assets/qrcode/${data.bID}.png" style="max-width: 100px;"></div>
                        <div class="col-5">
                            <h3><%= battery.Name %> <%= battery.Brand %> <%= battery.Cells %> <%= battery.Capacity %> mah</h3>
                            <div class="row">
                                <div class="col">
                                    <h6><strong>Brand :</strong> <%= battery.Brand %><br><strong>Cells :</strong> <%= battery.Cells %><br><strong>Capacity :</strong> <%= battery.Capacity %> mah (<%= battery.Efficiency %> C)<br><br></h6>
                                </div>
                                <div class="col">
                                    <h6><strong>Buy date :</strong> <%= battery.Buy_date %><br><strong>Last Usage :</strong> <%= battery.LastUsage_date %><br><strong>State :</strong> <%= battery.Status %><br><br></h6>
                                </div>
                            </div>
                        </div>
                        <div class="col">
                            <div class="row align-items-center">
                                <div class="col-auto" style="margin-bottom: 10px;width: 270px;">
                                    <div class="card shadow border-start-primary py-2">
                                        <div class="card-body">
                                            <div class="row align-items-center no-gutters">
                                                <div class="col me-2">
                                                    <div class="text-uppercase text-primary fw-bold text-xs mb-1"><span class="text-success"><strong>Cycles</strong><br></span></div>
                                                    <div class="text-dark fw-bold h5 mb-0"><span><%= battery.Cycles %></span></div>
                                                </div>
                                                <div class="col-auto"><i class="fa fa-refresh fa-2x text-success"></i></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-auto" style="margin-bottom: 10px;width: 270px;">
                                    <div class="card shadow border-start-success py-2">
                                        <div class="card-body">
                                            <div class="row align-items-center no-gutters">
                                                <div class="col me-2">
                                                    <div class="text-uppercase text-success fw-bold text-xs mb-1"><span class="text-warning"><strong>REsistance</strong><br></span></div>
                                                    <div class="text-dark fw-bold h5 mb-0"><span><%= battery.Resistance %></span></div>
                                                </div>
                                                <div class="col-auto"><i class="fas fa-bolt fa-2x text-warning"></i></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row" style="margin-top: 18px;">
                        <div class="col-lg-7 col-xl-8">
                            <div class="card shadow mb-4">
                                <div class="card-header d-flex justify-content-between align-items-center">
                                    <h6 class="text-primary fw-bold m-0">Usage</h6>
                                    <div class="dropdown no-arrow"><button class="btn btn-link btn-sm dropdown-toggle" aria-expanded="false" data-bs-toggle="dropdown" type="button"><i class="fas fa-ellipsis-v text-gray-400"></i></button>
                                        <div class="dropdown-menu shadow dropdown-menu-end animated--fade-in">
                                            <p class="text-center dropdown-header">dropdown header:</p><a class="dropdown-item" href="#">&nbsp;Action</a><a class="dropdown-item" href="#">&nbsp;Another action</a>
                                            <div class="dropdown-divider"></div><a class="dropdown-item" href="#">&nbsp;Something else here</a>
                                        </div>
                                    </div>
                                </div>
                                <div class="card-body" style="height: 397px;">
                                    <div class="chart-area" style="height: 370px;color: #0072c6;"><canvas data-bss-chart="{&quot;type&quot;:&quot;bar&quot;,&quot;data&quot;:{&quot;labels&quot;:[&quot;Jan&quot;,&quot;Feb&quot;,&quot;Mar&quot;,&quot;Apr&quot;,&quot;May&quot;,&quot;Jun&quot;,&quot;Jul&quot;,&quot;Aug&quot;],&quot;datasets&quot;:[{&quot;label&quot;:&quot;Earnings&quot;,&quot;backgroundColor&quot;:&quot;rgba(20,77,242,0.68)&quot;,&quot;borderColor&quot;:&quot;rgba(78, 115, 223, 1)&quot;,&quot;data&quot;:[&quot;0&quot;,&quot;10&quot;,&quot;5&quot;,&quot;15&quot;,&quot;10&quot;,&quot;20&quot;,&quot;15&quot;,&quot;23&quot;]}]},&quot;options&quot;:{&quot;maintainAspectRatio&quot;:false,&quot;legend&quot;:{&quot;display&quot;:false},&quot;title&quot;:{},&quot;scales&quot;:{&quot;xAxes&quot;:[{&quot;gridLines&quot;:{&quot;color&quot;:&quot;rgb(39,71,203)&quot;,&quot;zeroLineColor&quot;:&quot;rgb(39,71,203)&quot;,&quot;drawBorder&quot;:false,&quot;drawTicks&quot;:false,&quot;borderDash&quot;:[&quot;2&quot;],&quot;zeroLineBorderDash&quot;:[&quot;2&quot;],&quot;drawOnChartArea&quot;:false},&quot;ticks&quot;:{&quot;fontColor&quot;:&quot;#858796&quot;,&quot;padding&quot;:20}}],&quot;yAxes&quot;:[{&quot;gridLines&quot;:{&quot;color&quot;:&quot;rgb(39,71,203)&quot;,&quot;zeroLineColor&quot;:&quot;rgb(39,71,203)&quot;,&quot;drawBorder&quot;:false,&quot;drawTicks&quot;:false,&quot;borderDash&quot;:[&quot;2&quot;],&quot;zeroLineBorderDash&quot;:[&quot;2&quot;]},&quot;ticks&quot;:{&quot;fontColor&quot;:&quot;#858796&quot;,&quot;padding&quot;:20}}]}}}"></canvas></div>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-5 col-xl-4">
                            <div class="card shadow mb-4">
                                <div class="card-header d-flex justify-content-between align-items-center">
                                    <h6 class="text-primary fw-bold m-0">Resistance</h6>
                                    <div class="dropdown no-arrow"><button class="btn btn-link btn-sm dropdown-toggle" aria-expanded="false" data-bs-toggle="dropdown" type="button"><i class="fas fa-ellipsis-v text-gray-400"></i></button>
                                        <div class="dropdown-menu shadow dropdown-menu-end animated--fade-in">
                                            <p class="text-center dropdown-header">dropdown header:</p><a class="dropdown-item" href="#">&nbsp;Action</a><a class="dropdown-item" href="#">&nbsp;Another action</a>
                                            <div class="dropdown-divider"></div><a class="dropdown-item" href="#">&nbsp;Something else here</a>
                                        </div>
                                    </div>
                                </div>
                                <div class="card-body" style="height: 397px;">
                                    <div class="chart-area" style="height: 370px;"><canvas data-bss-chart="{&quot;type&quot;:&quot;line&quot;,&quot;data&quot;:{&quot;labels&quot;:[&quot;&quot;],&quot;datasets&quot;:[{&quot;label&quot;:&quot;&quot;,&quot;fill&quot;:true,&quot;data&quot;:[&quot;3&quot;,&quot;2.8&quot;,&quot;2.8&quot;,&quot;2.6&quot;,&quot;2.6&quot;,&quot;2.2&quot;],&quot;borderColor&quot;:&quot;#ffffff&quot;,&quot;borderWidth&quot;:&quot;0&quot;,&quot;backgroundColor&quot;:&quot;rgba(239,91,91,0.64)&quot;}]},&quot;options&quot;:{&quot;maintainAspectRatio&quot;:false,&quot;legend&quot;:{&quot;display&quot;:false,&quot;position&quot;:&quot;top&quot;},&quot;title&quot;:{},&quot;scales&quot;:{&quot;xAxes&quot;:[{&quot;gridLines&quot;:{&quot;drawBorder&quot;:true,&quot;drawTicks&quot;:true}}],&quot;yAxes&quot;:[{&quot;gridLines&quot;:{&quot;drawBorder&quot;:true,&quot;drawTicks&quot;:true,&quot;drawOnChartArea&quot;:true}}]}}}"></canvas></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row" style="margin-top: 14px;">
                        <div class="col">
                            <div class="card shadow">
                                <h3 class="text-dark mb-4" style="margin-top: 24px;margin-right: 0px;margin-left: 11px;">Last events</h3>
                                <div class="card-body text-start">
                                    <div class="row">
                                        <div class="col-md-6 text-nowrap">
                                            <div id="dataTable_length" class="dataTables_length" aria-controls="dataTable"><label class="form-label">Show&nbsp;<select class="d-inline-block form-select form-select-sm">
                                                        <option value="10" selected="">10</option>
                                                        <option value="25">25</option>
                                                        <option value="50">50</option>
                                                        <option value="100">100</option>
                                                    </select>&nbsp;</label></div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="text-md-end dataTables_filter" id="dataTable_filter"><label class="form-label"><input type="search" class="form-control form-control-sm" aria-controls="dataTable" placeholder="Search"></label></div>
                                        </div>
                                    </div>
                                    <div class="table-responsive table mt-2" id="dataTable-1" role="grid" aria-describedby="dataTable_info">
                                    <table class="table my-0" id="dataTable">
                                    <thead>
                                        <tr>
                                            <th >Date</th>
                                            <th >Events</th>
                                            <th >Message</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <% for(var i = 0; i < logs.length; i++) { %>
                                        <tr>
                                            <td><%= logs[i].Date %></td>
                                            <td><%= logs[i].Action %></td>
                                            <td><%= logs[i].Message %></td>
                                        </tr>
                                        <% } %>     
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <th >Date</th>
                                            <th >Events</th>
                                            <th >Message</th>
                                        </tr>
                                    </tfoot>
                                </table>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-6 align-self-center">
                                            <p id="dataTable_info" class="dataTables_info" role="status" aria-live="polite">Showing 1 to 10 of 27</p>
                                        </div>
                                        <div class="col-md-6">
                                            <nav class="d-lg-flex justify-content-lg-end dataTables_paginate paging_simple_numbers">
                                                <ul class="pagination">
                                                    <li class="page-item disabled"><a class="page-link" href="#" aria-label="Previous"><span aria-hidden="true">«</span></a></li>
                                                    <li class="page-item active"><a class="page-link" href="#">1</a></li>
                                                    <li class="page-item"><a class="page-link" href="#">2</a></li>
                                                    <li class="page-item"><a class="page-link" href="#">3</a></li>
                                                    <li class="page-item"><a class="page-link" href="#" aria-label="Next"><span aria-hidden="true">»</span></a></li>
                                                </ul>
                                            </nav>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <footer class="bg-white sticky-footer" style="height: 25px;">
                <div class="container my-auto">
                    <div class="text-center my-auto copyright"><span>Made by Mickael "PAPAMICA" Asseline</span></div>
                </div>
            </footer>
        </div><a class="border rounded d-inline scroll-to-top" href="#page-top"><i class="fas fa-angle-up"></i></a>
    </div>
    <script src="../assets/bootstrap/js/bootstrap.min.js"></script>
    <script src="../assets/js/chart.min.js"></script>
    <script src="../assets/js/bs-init.js"></script>
    <script src="../assets/js/theme.js"></script>
</body>

</html>
    `
);

module.exports = template;