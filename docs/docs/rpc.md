---
sidebar_position: 2
---

# RPC

## Methods

|Method|Authorization|Description|
|---|:-:|---|
|system.listMethods() → T[]||Return an array of all available XML-RPC methods on this server.|
|system.methodSignature(<br/>&nbsp;&nbsp;&nbsp;&nbsp;a1: String,<br/>) → T[]||Given the name of a method, return an array of legal signatures. Each signature is an array of strings.  The first item of each signature is the return type, and any others items are parameter types.|
|system.methodHelp(<br/>&nbsp;&nbsp;&nbsp;&nbsp;a1: String,<br/>) → String||Given the name of a method, return a help string.|
|system.multicall(<br/>&nbsp;&nbsp;&nbsp;&nbsp;a1: T[],<br/>) → T[]||Process an array of calls, and return an array of results.  Calls should be structs of the form \{'methodName': string, 'params': array}. Each result will either be a single-item array containing the result value, or a struct of the form \{'faultCode': int, 'faultString': string}.  This is useful when you need to make lots of small calls without lots of round trips.|
|Authenticate(<br/>&nbsp;&nbsp;&nbsp;&nbsp;a1: String,<br/>&nbsp;&nbsp;&nbsp;&nbsp;a2: String,<br/>) → bool||Allow user authentication by specifying a login and a password, to gain access to the set of functionalities corresponding to this authorization level.|
|ChangeAuthPassword(<br/>&nbsp;&nbsp;&nbsp;&nbsp;a1: String,<br/>&nbsp;&nbsp;&nbsp;&nbsp;a2: String,<br/>) → bool|SuperAdmin|Change the password for the specified login/user.|
|EnableCallbacks(<br/>&nbsp;&nbsp;&nbsp;&nbsp;a1: bool,<br/>) → bool||Allow the GameServer to call you back.|
|SetApiVersion(<br/>&nbsp;&nbsp;&nbsp;&nbsp;a1: String,<br/>) → bool||Define the wanted api.|
|GetVersion() → [GetVersion_t](#getversion)||Returns a struct with the Name, TitleId, Version, Build and ApiVersion of the application remotely controlled.|
|GetStatus() → [GetStatus_t](#getstatus)||Returns the current status of the server.|
|QuitGame() → bool|SuperAdmin|Quit the application.|
|CallVote(<br/>&nbsp;&nbsp;&nbsp;&nbsp;a1: String,<br/>) → bool|Admin|Call a vote for a cmd. The command is a XML string corresponding to an XmlRpc request.|
|CallVoteEx(<br/>&nbsp;&nbsp;&nbsp;&nbsp;a1: String,<br/>&nbsp;&nbsp;&nbsp;&nbsp;a2: f64,<br/>&nbsp;&nbsp;&nbsp;&nbsp;a3: i64,<br/>&nbsp;&nbsp;&nbsp;&nbsp;a4: i64,<br/>) → bool|Admin|Extended call vote. Same as CallVote, but you can additionally supply specific parameters for this vote: a ratio, a time out and who is voting. Special timeout values: a ratio of '-1' means default; a timeout of '0' means default, '1' means indefinite; Voters values: '0' means only active players, '1' means any player, '2' is for everybody, pure spectators included.|
|InternalCallVote() → bool||Used internally by game.|
|CancelVote() → bool|Admin|Cancel the current vote.|
|GetCurrentCallVote() → [GetCurrentCallVote_t](#getcurrentcallvote)||Returns the vote currently in progress. The returned structure is \{ CallerLogin, CmdName, CmdParam }.|
|SetCallVoteTimeOut(<br/>&nbsp;&nbsp;&nbsp;&nbsp;a1: i64,<br/>) → bool|Admin|Set a new timeout for waiting for votes. A zero value disables callvote. Requires a map restart to be taken into account.|
|GetCallVoteTimeOut() → [GetCallVoteTimeOut_t](#getcallvotetimeout)||Get the current and next timeout for waiting for votes. The struct returned contains two fields 'CurrentValue' and 'NextValue'.|
|SetCallVoteRatio(<br/>&nbsp;&nbsp;&nbsp;&nbsp;a1: f64,<br/>) → bool|Admin|Set a new default ratio for passing a vote. Must lie between 0 and 1.|
|GetCallVoteRatio() → f64||Get the current default ratio for passing a vote. This value lies between 0 and 1.|
|SetCallVoteRatios(<br/>&nbsp;&nbsp;&nbsp;&nbsp;a1: T[],<br/>) → bool|Admin|Set the ratios list for passing specific votes. The parameter is an array of structs \{string Command, double Ratio}, ratio is in [0,1] or -1 for vote disabled.|
|GetCallVoteRatios() → T[]||Get the current ratios for passing votes.|
|SetCallVoteRatiosEx(<br/>&nbsp;&nbsp;&nbsp;&nbsp;a1: bool,<br/>&nbsp;&nbsp;&nbsp;&nbsp;a2: T[],<br/>) → bool|Admin|Set the ratios list for passing specific votes, extended version with parameters matching. The parameters, a boolean ReplaceAll (or else, only modify specified ratios, leaving the previous ones unmodified) and an array of structs \{string Command, string Param, double Ratio}, ratio is in [0,1] or -1 for vote disabled. Param is matched against the vote parameters to make more specific ratios, leave empty to match all votes for the command.|
|GetCallVoteRatiosEx() → T[]||Get the current ratios for passing votes, extended version with parameters matching.|
|ChatSendServerMessage(<br/>&nbsp;&nbsp;&nbsp;&nbsp;a1: String,<br/>) → bool|Admin|Send a text message to all clients without the server login.|
|ChatSendServerMessageToLanguage(<br/>&nbsp;&nbsp;&nbsp;&nbsp;a1: T[],<br/>&nbsp;&nbsp;&nbsp;&nbsp;a2: String,<br/>) → bool|Admin|Send a localised text message to all clients without the server login, or optionally to a Login (which can be a single login or a list of comma-separated logins). The parameter is an array of structures \{Lang='xx', Text='...'}. If no matching language is found, the last text in the array is used.|
|ChatSendServerMessageToId(<br/>&nbsp;&nbsp;&nbsp;&nbsp;a1: String,<br/>&nbsp;&nbsp;&nbsp;&nbsp;a2: i64,<br/>) → bool|Admin|Send a text message without the server login to the client with the specified PlayerId.|
|ChatSendServerMessageToLogin(<br/>&nbsp;&nbsp;&nbsp;&nbsp;a1: String,<br/>&nbsp;&nbsp;&nbsp;&nbsp;a2: String,<br/>) → bool|Admin|Send a text message without the server login to the client with the specified login. Login can be a single login or a list of comma-separated logins.|
|ChatSend(<br/>&nbsp;&nbsp;&nbsp;&nbsp;a1: String,<br/>) → bool|Admin|Send a text message to all clients.|
|ChatSendToLanguage(<br/>&nbsp;&nbsp;&nbsp;&nbsp;a1: T[],<br/>&nbsp;&nbsp;&nbsp;&nbsp;a2: String,<br/>) → bool|Admin|Send a localised text message to all clients, or optionally to a Login (which can be a single login or a list of comma-separated logins). The parameter is an array of structures \{Lang='xx', Text='...'}. If no matching language is found, the last text in the array is used.|
|ChatSendToLogin(<br/>&nbsp;&nbsp;&nbsp;&nbsp;a1: String,<br/>&nbsp;&nbsp;&nbsp;&nbsp;a2: String,<br/>) → bool|Admin|Send a text message to the client with the specified login. Login can be a single login or a list of comma-separated logins.|
|ChatSendToId(<br/>&nbsp;&nbsp;&nbsp;&nbsp;a1: String,<br/>&nbsp;&nbsp;&nbsp;&nbsp;a2: i64,<br/>) → bool|Admin|Send a text message to the client with the specified PlayerId.|
|GetChatLines() → T[]|Admin|Returns the last chat lines. Maximum of 40 lines.|
|ChatEnableManualRouting(<br/>&nbsp;&nbsp;&nbsp;&nbsp;a1: bool,<br/>&nbsp;&nbsp;&nbsp;&nbsp;a2: bool,<br/>) → bool|Admin|The chat messages are no longer dispatched to the players, they only go to the rpc callback and the controller has to manually forward them. The second (optional) parameter allows all messages from the server to be automatically forwarded.|
|ChatForwardToLogin(<br/>&nbsp;&nbsp;&nbsp;&nbsp;a1: String,<br/>&nbsp;&nbsp;&nbsp;&nbsp;a2: String,<br/>&nbsp;&nbsp;&nbsp;&nbsp;a3: String,<br/>) → bool|Admin|(Text, SenderLogin, DestLogin) Send a text message to the specified DestLogin (or everybody if empty) on behalf of SenderLogin. DestLogin can be a single login or a list of comma-separated logins. Only available if manual routing is enabled.|
|SendNotice(<br/>&nbsp;&nbsp;&nbsp;&nbsp;a1: String,<br/>&nbsp;&nbsp;&nbsp;&nbsp;a2: String,<br/>&nbsp;&nbsp;&nbsp;&nbsp;a3: i64,<br/>) → bool|Admin|Display a notice on all clients. The parameters are the text message to display, and the login of the avatar to display next to it (or '' for no avatar), and an optional 'variant' in [0 = normal, 1 = Sad, 2 = Happy].|
|SendNoticeToId(<br/>&nbsp;&nbsp;&nbsp;&nbsp;a1: i64,<br/>&nbsp;&nbsp;&nbsp;&nbsp;a2: String,<br/>&nbsp;&nbsp;&nbsp;&nbsp;a3: i64,<br/>&nbsp;&nbsp;&nbsp;&nbsp;a4: i64,<br/>) → bool|Admin|Display a notice on the client with the specified UId. The parameters are the Uid of the client to whom the notice is sent, the text message to display, and the UId of the avatar to display next to it (or '255' for no avatar), and an optional 'variant' in [0 = normal, 1 = Sad, 2 = Happy].|
|SendNoticeToLogin(<br/>&nbsp;&nbsp;&nbsp;&nbsp;a1: String,<br/>&nbsp;&nbsp;&nbsp;&nbsp;a2: String,<br/>&nbsp;&nbsp;&nbsp;&nbsp;a3: String,<br/>&nbsp;&nbsp;&nbsp;&nbsp;a4: i64,<br/>) → bool|Admin|Display a notice on the client with the specified login. The parameters are the login of the client to whom the notice is sent, the text message to display, and the login of the avatar to display next to it (or '' for no avatar), and an optional 'variant' in [0 = normal, 1 = Sad, 2 = Happy]. Login can be a single login or a list of comma-separated logins. |
|SendDisplayManialinkPage(<br/>&nbsp;&nbsp;&nbsp;&nbsp;a1: String,<br/>&nbsp;&nbsp;&nbsp;&nbsp;a2: i64,<br/>&nbsp;&nbsp;&nbsp;&nbsp;a3: bool,<br/>) → bool|Admin|Display a manialink page on all clients. The parameters are the xml description of the page to display, a timeout to autohide it (0 = permanent), and a boolean to indicate whether the page must be hidden as soon as the user clicks on a page option.|
|SendDisplayManialinkPageToId(<br/>&nbsp;&nbsp;&nbsp;&nbsp;a1: i64,<br/>&nbsp;&nbsp;&nbsp;&nbsp;a2: String,<br/>&nbsp;&nbsp;&nbsp;&nbsp;a3: i64,<br/>&nbsp;&nbsp;&nbsp;&nbsp;a4: bool,<br/>) → bool|Admin|Display a manialink page on the client with the specified UId. The first parameter is the UId of the player, the other are identical to 'SendDisplayManialinkPage'.|
|SendDisplayManialinkPageToLogin(<br/>&nbsp;&nbsp;&nbsp;&nbsp;a1: String,<br/>&nbsp;&nbsp;&nbsp;&nbsp;a2: String,<br/>&nbsp;&nbsp;&nbsp;&nbsp;a3: i64,<br/>&nbsp;&nbsp;&nbsp;&nbsp;a4: bool,<br/>) → bool|Admin|Display a manialink page on the client with the specified login. The first parameter is the login of the player, the other are identical to 'SendDisplayManialinkPage'. Login can be a single login or a list of comma-separated logins.|
|SendHideManialinkPage() → bool|Admin|Hide the displayed manialink page on all clients.|
|SendHideManialinkPageToId(<br/>&nbsp;&nbsp;&nbsp;&nbsp;a1: i64,<br/>) → bool|Admin|Hide the displayed manialink page on the client with the specified UId.|
|SendHideManialinkPageToLogin(<br/>&nbsp;&nbsp;&nbsp;&nbsp;a1: String,<br/>) → bool|Admin|Hide the displayed manialink page on the client with the specified login. Login can be a single login or a list of comma-separated logins.|
|GetManialinkPageAnswers() → T[]||Returns the latest results from the current manialink page, as an array of structs \{string Login, int PlayerId, int Result} Result==0 -> no answer, Result>0.... -> answer from the player.|
|SendOpenLinkToId(<br/>&nbsp;&nbsp;&nbsp;&nbsp;a1: i64,<br/>&nbsp;&nbsp;&nbsp;&nbsp;a2: String,<br/>&nbsp;&nbsp;&nbsp;&nbsp;a3: i64,<br/>) → bool|Admin|Opens a link in the client with the specified UId. The parameters are the Uid of the client to whom the link to open is sent, the link url, and the 'LinkType' (0 in the external browser, 1 in the internal manialink browser).|
|SendOpenLinkToLogin(<br/>&nbsp;&nbsp;&nbsp;&nbsp;a1: String,<br/>&nbsp;&nbsp;&nbsp;&nbsp;a2: String,<br/>&nbsp;&nbsp;&nbsp;&nbsp;a3: i64,<br/>) → bool|Admin|Opens a link in the client with the specified login. The parameters are the login of the client to whom the link to open is sent, the link url, and the 'LinkType' (0 in the external browser, 1 in the internal manialink browser). Login can be a single login or a list of comma-separated logins. |
|Kick(<br/>&nbsp;&nbsp;&nbsp;&nbsp;a1: String,<br/>&nbsp;&nbsp;&nbsp;&nbsp;a2: String,<br/>) → bool|Admin|Kick the player with the specified login, with an optional message.|
|KickId(<br/>&nbsp;&nbsp;&nbsp;&nbsp;a1: i64,<br/>&nbsp;&nbsp;&nbsp;&nbsp;a2: String,<br/>) → bool|Admin|Kick the player with the specified PlayerId, with an optional message.|
|Ban(<br/>&nbsp;&nbsp;&nbsp;&nbsp;a1: String,<br/>&nbsp;&nbsp;&nbsp;&nbsp;a2: String,<br/>) → bool|Admin|Ban the player with the specified login, with an optional message.|
|BanAndBlackList(<br/>&nbsp;&nbsp;&nbsp;&nbsp;a1: String,<br/>&nbsp;&nbsp;&nbsp;&nbsp;a2: String,<br/>&nbsp;&nbsp;&nbsp;&nbsp;a3: bool,<br/>) → bool|Admin|Ban the player with the specified login, with a message. Add it to the black list, and optionally save the new list.|
|BanId(<br/>&nbsp;&nbsp;&nbsp;&nbsp;a1: i64,<br/>&nbsp;&nbsp;&nbsp;&nbsp;a2: String,<br/>) → bool|Admin|Ban the player with the specified PlayerId, with an optional message.|
|UnBan(<br/>&nbsp;&nbsp;&nbsp;&nbsp;a1: String,<br/>) → bool|Admin|Unban the player with the specified login.|
|CleanBanList() → bool|Admin|Clean the ban list of the server.|
|GetBanList(<br/>&nbsp;&nbsp;&nbsp;&nbsp;a1: i64,<br/>&nbsp;&nbsp;&nbsp;&nbsp;a2: i64,<br/>) → T[]||Returns the list of banned players. This method takes two parameters. The first parameter specifies the maximum number of infos to be returned, and the second one the starting index in the list. The list is an array of structures. Each structure contains the following fields : Login, ClientName and IPAddress.|
|BlackList(<br/>&nbsp;&nbsp;&nbsp;&nbsp;a1: String,<br/>) → bool|SuperAdmin|Blacklist the player with the specified login.|
|BlackListId(<br/>&nbsp;&nbsp;&nbsp;&nbsp;a1: i64,<br/>) → bool|SuperAdmin|Blacklist the player with the specified PlayerId.|
|UnBlackList(<br/>&nbsp;&nbsp;&nbsp;&nbsp;a1: String,<br/>) → bool|SuperAdmin|UnBlackList the player with the specified login.|
|CleanBlackList() → bool|SuperAdmin|Clean the blacklist of the server.|
|GetBlackList(<br/>&nbsp;&nbsp;&nbsp;&nbsp;a1: i64,<br/>&nbsp;&nbsp;&nbsp;&nbsp;a2: i64,<br/>) → T[]||Returns the list of blacklisted players. This method takes two parameters. The first parameter specifies the maximum number of infos to be returned, and the second one the starting index in the list. The list is an array of structures. Each structure contains the following fields : Login.|
|LoadBlackList(<br/>&nbsp;&nbsp;&nbsp;&nbsp;a1: String,<br/>) → bool|Admin|Load the black list file with the specified file name.|
|SaveBlackList(<br/>&nbsp;&nbsp;&nbsp;&nbsp;a1: String,<br/>) → bool|Admin|Save the black list in the file with specified file name.|
|AddGuest(<br/>&nbsp;&nbsp;&nbsp;&nbsp;a1: String,<br/>) → bool|Admin|Add the player with the specified login on the guest list.|
|AddGuestId(<br/>&nbsp;&nbsp;&nbsp;&nbsp;a1: i64,<br/>) → bool|Admin|Add the player with the specified PlayerId on the guest list.|
|RemoveGuest(<br/>&nbsp;&nbsp;&nbsp;&nbsp;a1: String,<br/>) → bool|Admin|Remove the player with the specified login from the guest list.|
|RemoveGuestId(<br/>&nbsp;&nbsp;&nbsp;&nbsp;a1: i64,<br/>) → bool|Admin|Remove the player with the specified PlayerId from the guest list.|
|CleanGuestList() → bool|Admin|Clean the guest list of the server.|
|GetGuestList(<br/>&nbsp;&nbsp;&nbsp;&nbsp;a1: i64,<br/>&nbsp;&nbsp;&nbsp;&nbsp;a2: i64,<br/>) → T[]||Returns the list of players on the guest list. This method takes two parameters. The first parameter specifies the maximum number of infos to be returned, and the second one the starting index in the list. The list is an array of structures. Each structure contains the following fields : Login.|
|LoadGuestList(<br/>&nbsp;&nbsp;&nbsp;&nbsp;a1: String,<br/>) → bool|Admin|Load the guest list file with the specified file name.|
|SaveGuestList(<br/>&nbsp;&nbsp;&nbsp;&nbsp;a1: String,<br/>) → bool|Admin|Save the guest list in the file with specified file name.|
|SetBuddyNotification(<br/>&nbsp;&nbsp;&nbsp;&nbsp;a1: String,<br/>&nbsp;&nbsp;&nbsp;&nbsp;a2: bool,<br/>) → bool|Admin|Sets whether buddy notifications should be sent in the chat. login is the login of the player, or '' for global setting, and enabled is the value.|
|GetBuddyNotification(<br/>&nbsp;&nbsp;&nbsp;&nbsp;a1: String,<br/>) → bool||Gets whether buddy notifications are enabled for login, or '' to get the global setting.|
|WriteFile(<br/>&nbsp;&nbsp;&nbsp;&nbsp;a1: String,<br/>&nbsp;&nbsp;&nbsp;&nbsp;a2: String,<br/>) → bool|Admin|Write the data to the specified file. The filename is relative to the Maps path.|
|TunnelSendDataToId(<br/>&nbsp;&nbsp;&nbsp;&nbsp;a1: i64,<br/>&nbsp;&nbsp;&nbsp;&nbsp;a2: String,<br/>) → bool|Admin|Send the data to the specified player.|
|TunnelSendDataToLogin(<br/>&nbsp;&nbsp;&nbsp;&nbsp;a1: String,<br/>&nbsp;&nbsp;&nbsp;&nbsp;a2: String,<br/>) → bool|Admin|Send the data to the specified player. Login can be a single login or a list of comma-separated logins.|
|Echo(<br/>&nbsp;&nbsp;&nbsp;&nbsp;a1: String,<br/>&nbsp;&nbsp;&nbsp;&nbsp;a2: String,<br/>) → bool|Admin|Just log the parameters and invoke a callback. Can be used to talk to other xmlrpc clients connected, or to make custom votes. If used in a callvote, the first parameter will be used as the vote message on the clients.|
|Ignore(<br/>&nbsp;&nbsp;&nbsp;&nbsp;a1: String,<br/>) → bool|Admin|Ignore the player with the specified login.|
|IgnoreId(<br/>&nbsp;&nbsp;&nbsp;&nbsp;a1: i64,<br/>) → bool|Admin|Ignore the player with the specified PlayerId.|
|UnIgnore(<br/>&nbsp;&nbsp;&nbsp;&nbsp;a1: String,<br/>) → bool|Admin|Unignore the player with the specified login.|
|UnIgnoreId(<br/>&nbsp;&nbsp;&nbsp;&nbsp;a1: i64,<br/>) → bool|Admin|Unignore the player with the specified PlayerId.|
|CleanIgnoreList() → bool|Admin|Clean the ignore list of the server.|
|GetIgnoreList(<br/>&nbsp;&nbsp;&nbsp;&nbsp;a1: i64,<br/>&nbsp;&nbsp;&nbsp;&nbsp;a2: i64,<br/>) → T[]||Returns the list of ignored players. This method takes two parameters. The first parameter specifies the maximum number of infos to be returned, and the second one the starting index in the list. The list is an array of structures. Each structure contains the following fields : Login.|
|Pay(<br/>&nbsp;&nbsp;&nbsp;&nbsp;a1: String,<br/>&nbsp;&nbsp;&nbsp;&nbsp;a2: i64,<br/>&nbsp;&nbsp;&nbsp;&nbsp;a3: String,<br/>) → i64|Admin|Pay planets from the server account to a player, returns the BillId. This method takes three parameters: Login of the payee, Cost in planets to pay and a Label to send with the payment. The creation of the transaction itself may cost planets, so you need to have planets on the server account.|
|SendBill(<br/>&nbsp;&nbsp;&nbsp;&nbsp;a1: String,<br/>&nbsp;&nbsp;&nbsp;&nbsp;a2: i64,<br/>&nbsp;&nbsp;&nbsp;&nbsp;a3: String,<br/>&nbsp;&nbsp;&nbsp;&nbsp;a4: String,<br/>) → i64|Admin|Create a bill, send it to a player, and return the BillId. This method takes four parameters: LoginFrom of the payer, Cost in planets the player has to pay, Label of the transaction and an optional LoginTo of the payee (if empty string, then the server account is used). The creation of the transaction itself may cost planets, so you need to have planets on the server account.|
|GetBillState(<br/>&nbsp;&nbsp;&nbsp;&nbsp;a1: i64,<br/>) → [GetBillState_t](#getbillstate)||Returns the current state of a bill. This method takes one parameter, the BillId. Returns a struct containing State, StateName and TransactionId. Possible enum values are: CreatingTransaction, Issued, ValidatingPayement, Payed, Refused, Error.|
|GetServerPlanets() → i64||Returns the current number of planets on the server account.|
|~~GetServerCoppers() → i64~~||(deprecated)|
|GetSystemInfo() → [GetSystemInfo_t](#getsysteminfo)||Get some system infos, including connection rates (in kbps).|
|SetConnectionRates(<br/>&nbsp;&nbsp;&nbsp;&nbsp;a1: i64,<br/>&nbsp;&nbsp;&nbsp;&nbsp;a2: i64,<br/>) → bool||Set the download and upload rates (in kbps).|
|GetServerTags() → T[]|Admin|Returns the list of tags and associated values set on this server.|
|SetServerTag(<br/>&nbsp;&nbsp;&nbsp;&nbsp;a1: String,<br/>&nbsp;&nbsp;&nbsp;&nbsp;a2: String,<br/>) → bool|Admin|Set a tag and its value on the server. This method takes two parameters. The first parameter specifies the name of the tag, and the second one its value. The list is an array of structures \{string Name, string Value}.|
|UnsetServerTag(<br/>&nbsp;&nbsp;&nbsp;&nbsp;a1: String,<br/>) → bool|Admin|Unset the tag with the specified name on the server.|
|ResetServerTags() → bool|Admin|Reset all tags on the server.|
|SetServerName(<br/>&nbsp;&nbsp;&nbsp;&nbsp;a1: String,<br/>) → bool|Admin|Set a new server name in utf8 format.|
|GetServerName() → String||Get the server name in utf8 format.|
|SetServerComment(<br/>&nbsp;&nbsp;&nbsp;&nbsp;a1: String,<br/>) → bool|Admin|Set a new server comment in utf8 format.|
|GetServerComment() → String||Get the server comment in utf8 format.|
|SetHideServer(<br/>&nbsp;&nbsp;&nbsp;&nbsp;a1: i64,<br/>) → bool|Admin|Set whether the server should be hidden from the public server list (0 = visible, 1 = always hidden, 2 = hidden from nations).|
|GetHideServer() → i64||Get whether the server wants to be hidden from the public server list.|
|SetServerPassword(<br/>&nbsp;&nbsp;&nbsp;&nbsp;a1: String,<br/>) → bool|Admin|Set a new password for the server.|
|GetServerPassword() → String||Get the server password if called as Admin or Super Admin, else returns if a password is needed or not.|
|SetServerPasswordForSpectator(<br/>&nbsp;&nbsp;&nbsp;&nbsp;a1: String,<br/>) → bool|Admin|Set a new password for the spectator mode.|
|GetServerPasswordForSpectator() → String||Get the password for spectator mode if called as Admin or Super Admin, else returns if a password is needed or not.|
|SetMaxPlayers(<br/>&nbsp;&nbsp;&nbsp;&nbsp;a1: i64,<br/>) → bool|Admin|Set a new maximum number of players. Requires a map restart to be taken into account.|
|GetMaxPlayers() → [GetMaxPlayers_t](#getmaxplayers)||Get the current and next maximum number of players allowed on server. The struct returned contains two fields CurrentValue and NextValue.|
|SetMaxSpectators(<br/>&nbsp;&nbsp;&nbsp;&nbsp;a1: i64,<br/>) → bool|Admin|Set a new maximum number of Spectators. Requires a map restart to be taken into account.|
|GetMaxSpectators() → [GetMaxSpectators_t](#getmaxspectators)||Get the current and next maximum number of Spectators allowed on server. The struct returned contains two fields CurrentValue and NextValue.|
|SetLobbyInfo(<br/>&nbsp;&nbsp;&nbsp;&nbsp;a1: bool,<br/>&nbsp;&nbsp;&nbsp;&nbsp;a2: i64,<br/>&nbsp;&nbsp;&nbsp;&nbsp;a3: i64,<br/>&nbsp;&nbsp;&nbsp;&nbsp;a4: f64,<br/>) → bool|Admin|Declare if the server is a lobby, the number and maximum number of players currently managed by it, and the average level of the players.|
|GetLobbyInfo() → [GetLobbyInfo_t](#getlobbyinfo)||Get whether the server if a lobby, the number and maximum number of players currently managed by it. The struct returned contains 4 fields IsLobby, LobbyPlayers, LobbyMaxPlayers, and LobbyPlayersLevel.|
|CustomizeQuitDialog(<br/>&nbsp;&nbsp;&nbsp;&nbsp;a1: String,<br/>&nbsp;&nbsp;&nbsp;&nbsp;a2: String,<br/>&nbsp;&nbsp;&nbsp;&nbsp;a3: bool,<br/>&nbsp;&nbsp;&nbsp;&nbsp;a4: i64,<br/>) → bool|Admin|Customize the clients 'leave server' dialog box. Parameters are: ManialinkPage, SendToServer url '#qjoin=login@title', ProposeAddToFavorites and DelayQuitButton (in milliseconds).|
|SendToServerAfterMatchEnd(<br/>&nbsp;&nbsp;&nbsp;&nbsp;a1: String,<br/>) → bool|Admin|Prior to loading next map, execute SendToServer url '#qjoin=login@title'.|
|KeepPlayerSlots(<br/>&nbsp;&nbsp;&nbsp;&nbsp;a1: bool,<br/>) → bool|Admin|Set whether, when a player is switching to spectator, the server should still consider him a player and keep his player slot, or not.|
|IsKeepingPlayerSlots() → bool||Get whether the server keeps player slots when switching to spectator.|
|AllowMapDownload(<br/>&nbsp;&nbsp;&nbsp;&nbsp;a1: bool,<br/>) → bool|Admin|Allow clients to download maps from the server.|
|IsMapDownloadAllowed() → bool||Returns if clients can download maps from the server.|
|~~AllowChallengeDownload(<br/>&nbsp;&nbsp;&nbsp;&nbsp;a1: bool,<br/>) → bool~~||(deprecated)|
|~~IsChallengeDownloadAllowed() → bool~~||(deprecated)|
|GameDataDirectory() → String|Admin|Returns the path of the game datas directory.|
|GetMapsDirectory() → String|Admin|Returns the path of the maps directory.|
|~~GetTracksDirectory() → String~~||(deprecated)|
|GetSkinsDirectory() → String|Admin|Returns the path of the skins directory.|
|~~SetTeamInfo(<br/>&nbsp;&nbsp;&nbsp;&nbsp;a1: String,<br/>&nbsp;&nbsp;&nbsp;&nbsp;a2: f64,<br/>&nbsp;&nbsp;&nbsp;&nbsp;a3: String,<br/>&nbsp;&nbsp;&nbsp;&nbsp;a4: String,<br/>&nbsp;&nbsp;&nbsp;&nbsp;a5: f64,<br/>&nbsp;&nbsp;&nbsp;&nbsp;a6: String,<br/>&nbsp;&nbsp;&nbsp;&nbsp;a7: String,<br/>&nbsp;&nbsp;&nbsp;&nbsp;a8: f64,<br/>&nbsp;&nbsp;&nbsp;&nbsp;a9: String,<br/>) → bool~~|Admin|Set Team names and colors (deprecated).|
|GetTeamInfo(<br/>&nbsp;&nbsp;&nbsp;&nbsp;a1: i64,<br/>) → [GetTeamInfo_t](#getteaminfo)|Admin|Return Team info for a given clan (0 = no clan, 1, 2). The structure contains: Name, ZonePath, City, EmblemUrl, HuePrimary, HueSecondary, RGB, ClubLinkUrl.|
|SetForcedClubLinks(<br/>&nbsp;&nbsp;&nbsp;&nbsp;a1: String,<br/>&nbsp;&nbsp;&nbsp;&nbsp;a2: String,<br/>) → bool|Admin|Set the clublinks to use for the two clans.|
|GetForcedClubLinks() → [GetForcedClubLinks_t](#getforcedclublinks)||Get the forced clublinks.|
|ConnectFakePlayer() → String|Admin|(debug tool) Connect a fake player to the server and returns the login.|
|DisconnectFakePlayer(<br/>&nbsp;&nbsp;&nbsp;&nbsp;a1: String,<br/>) → bool|Admin|(debug tool) Disconnect a fake player, or all the fake players if login is '*'.|
|GetDemoTokenInfosForPlayer(<br/>&nbsp;&nbsp;&nbsp;&nbsp;a1: String,<br/>) → [GetDemoTokenInfosForPlayer_t](#getdemotokeninfosforplayer)||Returns the token infos for a player. The returned structure is \{ TokenCost, CanPayToken }.|
|DisableHorns(<br/>&nbsp;&nbsp;&nbsp;&nbsp;a1: bool,<br/>) → bool|Admin|Disable player horns.|
|AreHornsDisabled() → bool||Returns whether the horns are disabled.|
|DisableServiceAnnounces(<br/>&nbsp;&nbsp;&nbsp;&nbsp;a1: bool,<br/>) → bool|Admin|Disable the automatic mesages when a player connects/disconnects from the server.|
|AreServiceAnnouncesDisabled() → bool||Returns whether the automatic mesages are disabled.|
|DisableProfileSkins(<br/>&nbsp;&nbsp;&nbsp;&nbsp;a1: bool,<br/>) → bool|Admin|Ignore players profile skin customisation.|
|AreProfileSkinsDisabled() → bool||Returns whether the custom skins are disabled.|
|AutoSaveReplays(<br/>&nbsp;&nbsp;&nbsp;&nbsp;a1: bool,<br/>) → bool|SuperAdmin|Enable the autosaving of all replays (vizualisable replays with all players, but not validable) on the server.|
|IsAutoSaveReplaysEnabled() → bool||Returns if autosaving of all replays is enabled on the server.|
|SaveCurrentReplay(<br/>&nbsp;&nbsp;&nbsp;&nbsp;a1: String,<br/>) → bool|Admin|Saves the current replay (vizualisable replays with all players, but not validable). Pass a filename, or '' for an automatic filename.|
|SaveBestGhostsReplay(<br/>&nbsp;&nbsp;&nbsp;&nbsp;a1: String,<br/>&nbsp;&nbsp;&nbsp;&nbsp;a2: String,<br/>) → bool|Admin|Saves a replay with the ghost of all the players' best race. First parameter is the login of the player (or '' for all players), Second parameter is the filename, or '' for an automatic filename.|
|GetValidationReplay(<br/>&nbsp;&nbsp;&nbsp;&nbsp;a1: String,<br/>) → String||Returns a replay containing the data needed to validate the current best time of the player. The parameter is the login of the player.|
|SetServerOptions(<br/>&nbsp;&nbsp;&nbsp;&nbsp;a1: [SetServerOptions_t](#setserveroptions),<br/>) → bool|Admin|Set new server options using the struct passed as parameters. This struct must contain the following fields : Name, Comment, Password, PasswordForSpectator, NextCallVoteTimeOut, CallVoteRatio. May additionally include any of the other members listed in RpcGetServerOptions. A change of NextMaxPlayers, NextMaxSpectators, NextCallVoteTimeOut requires a map restart to be taken into account.|
|GetServerOptions(<br/>&nbsp;&nbsp;&nbsp;&nbsp;a1: i64,<br/>) → [GetServerOptions_t](#getserveroptions)||Optional parameter for compatibility: struct version (0 = united, 1 = forever). Returns a struct containing the server options: Name, Comment, Password, PasswordForSpectator, CurrentMaxPlayers, NextMaxPlayers, CurrentMaxSpectators, NextMaxSpectators, IsP2PUpload, IsP2PDownload, CurrentLadderMode, NextLadderMode, CurrentVehicleNetQuality, NextVehicleNetQuality, CurrentCallVoteTimeOut, NextCallVoteTimeOut, CallVoteRatio, AllowChallengeDownload and AutoSaveReplays, and additionally for forever: RefereePassword, RefereeMode, AutoSaveValidationReplays, HideServer, CurrentUseChangingValidationSeed, NextUseChangingValidationSeed.|
|SetForcedTeams(<br/>&nbsp;&nbsp;&nbsp;&nbsp;a1: bool,<br/>) → bool|Admin|Set whether the players can choose their side or if the teams are forced by the server (using ForcePlayerTeam()).|
|GetForcedTeams() → bool||Returns whether the players can choose their side or if the teams are forced by the server.|
|SetForcedMods(<br/>&nbsp;&nbsp;&nbsp;&nbsp;a1: bool,<br/>&nbsp;&nbsp;&nbsp;&nbsp;a2: T[],<br/>) → bool|Admin|Set the mods to apply on the clients. Parameters: Override, if true even the maps with a mod will be overridden by the server setting; and Mods, an array of structures [\{EnvName, Url}, ...]. Requires a map restart to be taken into account.|
|GetForcedMods() → [GetForcedMods_t](#getforcedmods)||Get the mods settings.|
|SetForcedMusic(<br/>&nbsp;&nbsp;&nbsp;&nbsp;a1: bool,<br/>&nbsp;&nbsp;&nbsp;&nbsp;a2: String,<br/>) → bool|Admin|Set the music to play on the clients. Parameters: Override, if true even the maps with a custom music will be overridden by the server setting, and a UrlOrFileName for the music. Requires a map restart to be taken into account.|
|GetForcedMusic() → [GetForcedMusic_t](#getforcedmusic)||Get the music setting.|
|SetForcedSkins(<br/>&nbsp;&nbsp;&nbsp;&nbsp;a1: T[],<br/>) → bool|Admin|Defines a list of remappings for player skins. It expects a list of structs Orig, Name, Checksum, Url.  Orig is the name of the skin to remap, or '*' for any other. Name, Checksum, Url define the skin to use. (They are optional, you may set value '' for any of those. All 3 null means same as Orig). Will only affect players connecting after the value is set.|
|GetForcedSkins() → T[]||Get the current forced skins.|
|GetLastConnectionErrorMessage() → String|Admin|Returns the last error message for an internet connection.|
|GetModeScriptText() → String||Get the current mode script.|
|SetModeScriptText(<br/>&nbsp;&nbsp;&nbsp;&nbsp;a1: String,<br/>) → bool|Admin|Set the mode script and restart.|
|GetModeScriptInfo() → [GetModeScriptInfo_t](#getmodescriptinfo)||Returns the description of the current mode script, as a structure containing: Name, CompatibleTypes, Description, Version and the settings available.|
|GetModeScriptSettings() → [GetModeScriptSettings_t](#getmodescriptsettings)||Returns the current settings of the mode script.|
|SetModeScriptSettings(<br/>&nbsp;&nbsp;&nbsp;&nbsp;a1: [SetModeScriptSettings_t](#setmodescriptsettings),<br/>) → bool|Admin|Change the settings of the mode script.|
|SendModeScriptCommands(<br/>&nbsp;&nbsp;&nbsp;&nbsp;a1: [SendModeScriptCommands_t](#sendmodescriptcommands),<br/>) → bool|Admin|Send commands to the mode script.|
|SetModeScriptSettingsAndCommands(<br/>&nbsp;&nbsp;&nbsp;&nbsp;a1: [SetModeScriptSettingsAndCommands_t](#setmodescriptsettingsandcommands),<br/>&nbsp;&nbsp;&nbsp;&nbsp;a2: [SetModeScriptSettingsAndCommands_t](#setmodescriptsettingsandcommands),<br/>) → bool|Admin|Change the settings and send commands to the mode script.|
|GetModeScriptVariables() → [GetModeScriptVariables_t](#getmodescriptvariables)||Returns the current xml-rpc variables of the mode script.|
|SetModeScriptVariables(<br/>&nbsp;&nbsp;&nbsp;&nbsp;a1: [SetModeScriptVariables_t](#setmodescriptvariables),<br/>) → bool|Admin|Set the xml-rpc variables of the mode script.|
|TriggerModeScriptEvent(<br/>&nbsp;&nbsp;&nbsp;&nbsp;a1: String,<br/>&nbsp;&nbsp;&nbsp;&nbsp;a2: String,<br/>) → bool|Admin|Send an event to the mode script.|
|TriggerModeScriptEventArray(<br/>&nbsp;&nbsp;&nbsp;&nbsp;a1: String,<br/>&nbsp;&nbsp;&nbsp;&nbsp;a2: T[],<br/>) → bool|Admin|Send an event to the mode script.|
|SetServerPlugin(<br/>&nbsp;&nbsp;&nbsp;&nbsp;a1: bool,<br/>&nbsp;&nbsp;&nbsp;&nbsp;a2: String,<br/>&nbsp;&nbsp;&nbsp;&nbsp;a3: [SetServerPlugin_t](#setserverplugin),<br/>) → bool|Admin|Set the ServerPlugin settings. Parameters: ForceReload to reload from disk, optionally: Name the filename relative to Scripts/ directory, Settings the script #Settings to apply.|
|GetServerPlugin() → [GetServerPlugin_t](#getserverplugin)||Get the ServerPlugin current settings.|
|GetServerPluginVariables() → [GetServerPluginVariables_t](#getserverpluginvariables)||Returns the current xml-rpc variables of the server script.|
|SetServerPluginVariables(<br/>&nbsp;&nbsp;&nbsp;&nbsp;a1: [SetServerPluginVariables_t](#setserverpluginvariables),<br/>) → bool|Admin|Set the xml-rpc variables of the server script.|
|TriggerServerPluginEvent(<br/>&nbsp;&nbsp;&nbsp;&nbsp;a1: String,<br/>&nbsp;&nbsp;&nbsp;&nbsp;a2: String,<br/>) → bool|Admin|Send an event to the server script.|
|TriggerServerPluginEventArray(<br/>&nbsp;&nbsp;&nbsp;&nbsp;a1: String,<br/>&nbsp;&nbsp;&nbsp;&nbsp;a2: T[],<br/>) → bool|Admin|Send an event to the server script.|
|GetScriptCloudVariables(<br/>&nbsp;&nbsp;&nbsp;&nbsp;a1: String,<br/>&nbsp;&nbsp;&nbsp;&nbsp;a2: String,<br/>) → [GetScriptCloudVariables_t](#getscriptcloudvariables)|Admin|Get the script cloud variables of given object.|
|SetScriptCloudVariables(<br/>&nbsp;&nbsp;&nbsp;&nbsp;a1: String,<br/>&nbsp;&nbsp;&nbsp;&nbsp;a2: String,<br/>&nbsp;&nbsp;&nbsp;&nbsp;a3: [SetScriptCloudVariables_t](#setscriptcloudvariables),<br/>) → bool|Admin|Set the script cloud variables of given object.|
|RestartMap() → bool|Admin|Restarts the map, with an optional boolean parameter DontClearCupScores (only available in cup mode).|
|NextMap() → bool|Admin|Switch to next map, with an optional boolean parameter DontClearCupScores (only available in cup mode).|
|AutoTeamBalance() → bool|Admin|Attempt to balance teams.|
|~~ChallengeRestart() → bool~~||(deprecated)|
|~~RestartChallenge() → bool~~||(deprecated)|
|~~NextChallenge() → bool~~||(deprecated)|
|StopServer() → bool|SuperAdmin|Stop the server.|
|SetGameInfos(<br/>&nbsp;&nbsp;&nbsp;&nbsp;a1: [SetGameInfos_t](#setgameinfos),<br/>) → bool|Admin|Set new game settings using the struct passed as parameters. This struct must contain the following fields : GameMode, ChatTime, RoundsPointsLimit, RoundsUseNewRules, RoundsForcedLaps, TimeAttackLimit, TimeAttackSynchStartPeriod, TeamPointsLimit, TeamMaxPoints, TeamUseNewRules, LapsNbLaps, LapsTimeLimit, FinishTimeout, and optionally: AllWarmUpDuration, DisableRespawn, ForceShowAllOpponents, RoundsPointsLimitNewRules, TeamPointsLimitNewRules, CupPointsLimit, CupRoundsPerChallenge, CupNbWinners, CupWarmUpDuration. Requires a map restart to be taken into account.|
|GetCurrentGameInfo(<br/>&nbsp;&nbsp;&nbsp;&nbsp;a1: i64,<br/>) → [GetCurrentGameInfo_t](#getcurrentgameinfo)||Optional parameter for compatibility: struct version (0 = united, 1 = forever). Returns a struct containing the current game settings, ie: GameMode, ChatTime, NbChallenge, RoundsPointsLimit, RoundsUseNewRules, RoundsForcedLaps, TimeAttackLimit, TimeAttackSynchStartPeriod, TeamPointsLimit, TeamMaxPoints, TeamUseNewRules, LapsNbLaps, LapsTimeLimit, FinishTimeout, and additionally for version 1: AllWarmUpDuration, DisableRespawn, ForceShowAllOpponents, RoundsPointsLimitNewRules, TeamPointsLimitNewRules, CupPointsLimit, CupRoundsPerChallenge, CupNbWinners, CupWarmUpDuration.|
|GetNextGameInfo(<br/>&nbsp;&nbsp;&nbsp;&nbsp;a1: i64,<br/>) → [GetNextGameInfo_t](#getnextgameinfo)||Optional parameter for compatibility: struct version (0 = united, 1 = forever). Returns a struct containing the game settings for the next map, ie: GameMode, ChatTime, NbChallenge, RoundsPointsLimit, RoundsUseNewRules, RoundsForcedLaps, TimeAttackLimit, TimeAttackSynchStartPeriod, TeamPointsLimit, TeamMaxPoints, TeamUseNewRules, LapsNbLaps, LapsTimeLimit, FinishTimeout, and additionally for version 1: AllWarmUpDuration, DisableRespawn, ForceShowAllOpponents, RoundsPointsLimitNewRules, TeamPointsLimitNewRules, CupPointsLimit, CupRoundsPerChallenge, CupNbWinners, CupWarmUpDuration.|
|GetGameInfos(<br/>&nbsp;&nbsp;&nbsp;&nbsp;a1: i64,<br/>) → [GetGameInfos_t](#getgameinfos)||Optional parameter for compatibility: struct version (0 = united, 1 = forever). Returns a struct containing two other structures, the first containing the current game settings and the second the game settings for next map. The first structure is named CurrentGameInfos and the second NextGameInfos.|
|SetForceShowAllOpponents(<br/>&nbsp;&nbsp;&nbsp;&nbsp;a1: i64,<br/>) → bool|Admin|Set whether to override the players preferences and always display all opponents (0=no override, 1=show all, other value=minimum number of opponents). Requires a map restart to be taken into account.|
|GetForceShowAllOpponents() → [GetForceShowAllOpponents_t](#getforceshowallopponents)||Get whether players are forced to show all opponents. The struct returned contains two fields CurrentValue and NextValue.|
|SetScriptName(<br/>&nbsp;&nbsp;&nbsp;&nbsp;a1: String,<br/>) → bool|Admin|Set a new mode script name for script mode. Requires a map restart to be taken into account.|
|GetScriptName() → [GetScriptName_t](#getscriptname)||Get the current and next mode script name for script mode. The struct returned contains two fields CurrentValue and NextValue.|
|~~SetCupRoundsPerChallenge(<br/>&nbsp;&nbsp;&nbsp;&nbsp;a1: i64,<br/>) → bool~~||(deprecated)|
|~~GetCupRoundsPerChallenge() → [GetCupRoundsPerChallenge_t](#getcuproundsperchallenge)~~||(deprecated)|
|GetCurrentMapIndex() → i64||Returns the current map index in the selection, or -1 if the map is no longer in the selection.|
|GetNextMapIndex() → i64||Returns the map index in the selection that will be played next (unless the current one is restarted...)|
|SetNextMapIndex(<br/>&nbsp;&nbsp;&nbsp;&nbsp;a1: i64,<br/>) → bool||Sets the map index in the selection that will be played next (unless the current one is restarted...)|
|SetNextMapIdent(<br/>&nbsp;&nbsp;&nbsp;&nbsp;a1: String,<br/>) → bool||Sets the map in the selection that will be played next (unless the current one is restarted...)|
|JumpToMapIndex(<br/>&nbsp;&nbsp;&nbsp;&nbsp;a1: i64,<br/>) → bool||Immediately jumps to the map designated by the index in the selection.|
|JumpToMapIdent(<br/>&nbsp;&nbsp;&nbsp;&nbsp;a1: String,<br/>) → bool||Immediately jumps to the map designated by its identifier (it must be in the selection).|
|GetCurrentMapInfo() → [GetCurrentMapInfo_t](#getcurrentmapinfo)||Returns a struct containing the infos for the current map. The struct contains the following fields : Name, UId, FileName, Author, AuthorNickname, Environnement, Mood, BronzeTime, SilverTime, GoldTime, AuthorTime, CopperPrice, LapRace, NbLaps, NbCheckpoints, MapType, MapStyle.|
|GetNextMapInfo() → [GetNextMapInfo_t](#getnextmapinfo)||Returns a struct containing the infos for the next map. The struct contains the following fields : Name, UId, FileName, Author, AuthorNickname, Environnement, Mood, BronzeTime, SilverTime, GoldTime, AuthorTime, CopperPrice, LapRace, MapType, MapStyle. (NbLaps and NbCheckpoints are also present but always set to -1)|
|GetMapInfo(<br/>&nbsp;&nbsp;&nbsp;&nbsp;a1: String,<br/>) → [GetMapInfo_t](#getmapinfo)||Returns a struct containing the infos for the map with the specified filename. The struct contains the following fields : Name, UId, FileName, Author, AuthorNickname, Environnement, Mood, BronzeTime, SilverTime, GoldTime, AuthorTime, CopperPrice, LapRace, MapType, MapStyle. (NbLaps and NbCheckpoints are also present but always set to -1)|
|CheckMapForCurrentServerParams(<br/>&nbsp;&nbsp;&nbsp;&nbsp;a1: String,<br/>) → bool||Returns a boolean if the map with the specified filename matches the current server settings. |
|GetMapList(<br/>&nbsp;&nbsp;&nbsp;&nbsp;a1: i64,<br/>&nbsp;&nbsp;&nbsp;&nbsp;a2: i64,<br/>) → T[]||Returns a list of maps among the current selection of the server. This method take two parameters. The first parameter specifies the maximum number of infos to be returned, and the second one the starting index in the selection. The list is an array of structures. Each structure contains the following fields : Name, UId, FileName, Environnement, Author, AuthorNickname, GoldTime, CopperPrice, MapType, MapStyle.|
|AddMap(<br/>&nbsp;&nbsp;&nbsp;&nbsp;a1: String,<br/>) → bool|Admin|Add the map with the specified filename at the end of the current selection.|
|AddMapList(<br/>&nbsp;&nbsp;&nbsp;&nbsp;a1: T[],<br/>) → i64|Admin|Add the list of maps with the specified filenames at the end of the current selection. The list of maps to add is an array of strings.|
|RemoveMap(<br/>&nbsp;&nbsp;&nbsp;&nbsp;a1: String,<br/>) → bool|Admin|Remove the map with the specified filename from the current selection.|
|RemoveMapList(<br/>&nbsp;&nbsp;&nbsp;&nbsp;a1: T[],<br/>) → i64|Admin|Remove the list of maps with the specified filenames from the current selection. The list of maps to remove is an array of strings.|
|InsertMap(<br/>&nbsp;&nbsp;&nbsp;&nbsp;a1: String,<br/>) → bool|Admin|Insert the map with the specified filename after the current map.|
|InsertMapList(<br/>&nbsp;&nbsp;&nbsp;&nbsp;a1: T[],<br/>) → i64|Admin|Insert the list of maps with the specified filenames after the current map. The list of maps to insert is an array of strings.|
|ChooseNextMap(<br/>&nbsp;&nbsp;&nbsp;&nbsp;a1: String,<br/>) → bool|Admin|Set as next map the one with the specified filename, if it is present in the selection.|
|ChooseNextMapList(<br/>&nbsp;&nbsp;&nbsp;&nbsp;a1: T[],<br/>) → i64|Admin|Set as next maps the list of maps with the specified filenames, if they are present in the selection. The list of maps to choose is an array of strings.|
|~~GetCurrentChallengeIndex() → i64~~||(deprecated)|
|~~GetNextChallengeIndex() → i64~~||(deprecated)|
|~~SetNextChallengeIndex(<br/>&nbsp;&nbsp;&nbsp;&nbsp;a1: i64,<br/>) → bool~~||(deprecated)|
|~~GetCurrentChallengeInfo() → [GetCurrentChallengeInfo_t](#getcurrentchallengeinfo)~~||(deprecated)|
|~~GetNextChallengeInfo() → [GetNextChallengeInfo_t](#getnextchallengeinfo)~~||(deprecated)|
|~~GetChallengeInfo(<br/>&nbsp;&nbsp;&nbsp;&nbsp;a1: String,<br/>) → [GetChallengeInfo_t](#getchallengeinfo)~~||(deprecated)|
|~~CheckChallengeForCurrentServerParams(<br/>&nbsp;&nbsp;&nbsp;&nbsp;a1: String,<br/>) → bool~~||(deprecated)|
|~~GetChallengeList(<br/>&nbsp;&nbsp;&nbsp;&nbsp;a1: i64,<br/>&nbsp;&nbsp;&nbsp;&nbsp;a2: i64,<br/>) → T[]~~||(deprecated)|
|~~AddChallenge(<br/>&nbsp;&nbsp;&nbsp;&nbsp;a1: String,<br/>) → bool~~||(deprecated)|
|~~AddChallengeList(<br/>&nbsp;&nbsp;&nbsp;&nbsp;a1: T[],<br/>) → i64~~||(deprecated)|
|~~RemoveChallenge(<br/>&nbsp;&nbsp;&nbsp;&nbsp;a1: String,<br/>) → bool~~||(deprecated)|
|~~RemoveChallengeList(<br/>&nbsp;&nbsp;&nbsp;&nbsp;a1: T[],<br/>) → i64~~||(deprecated)|
|~~InsertChallenge(<br/>&nbsp;&nbsp;&nbsp;&nbsp;a1: String,<br/>) → bool~~||(deprecated)|
|~~InsertChallengeList(<br/>&nbsp;&nbsp;&nbsp;&nbsp;a1: T[],<br/>) → i64~~||(deprecated)|
|~~ChooseNextChallenge(<br/>&nbsp;&nbsp;&nbsp;&nbsp;a1: String,<br/>) → bool~~||(deprecated)|
|~~ChooseNextChallengeList(<br/>&nbsp;&nbsp;&nbsp;&nbsp;a1: T[],<br/>) → i64~~||(deprecated)|
|LoadMatchSettings(<br/>&nbsp;&nbsp;&nbsp;&nbsp;a1: String,<br/>) → i64|Admin|Set a list of maps defined in the playlist with the specified filename as the current selection of the server, and load the gameinfos from the same file.|
|AppendPlaylistFromMatchSettings(<br/>&nbsp;&nbsp;&nbsp;&nbsp;a1: String,<br/>) → i64|Admin|Add a list of maps defined in the playlist with the specified filename at the end of the current selection.|
|SaveMatchSettings(<br/>&nbsp;&nbsp;&nbsp;&nbsp;a1: String,<br/>) → i64|Admin|Save the current selection of map in the playlist with the specified filename, as well as the current gameinfos.|
|InsertPlaylistFromMatchSettings(<br/>&nbsp;&nbsp;&nbsp;&nbsp;a1: String,<br/>) → i64|Admin|Insert a list of maps defined in the playlist with the specified filename after the current map.|
|GetPlayerList(<br/>&nbsp;&nbsp;&nbsp;&nbsp;a1: i64,<br/>&nbsp;&nbsp;&nbsp;&nbsp;a2: i64,<br/>&nbsp;&nbsp;&nbsp;&nbsp;a3: i64,<br/>) → T[]||Returns the list of players on the server. This method take two parameters. The first parameter specifies the maximum number of infos to be returned, and the second one the starting index in the list, an optional 3rd parameter is used for compatibility: struct version (0 = united, 1 = forever, 2 = forever, including the servers). The list is an array of PlayerInfo structures. Forever PlayerInfo struct is: Login, NickName, PlayerId, TeamId, SpectatorStatus, LadderRanking, and Flags.  LadderRanking is 0 when not in official mode,  Flags = ForceSpectator(0,1,2) + StereoDisplayMode * 1000 + IsManagedByAnOtherServer * 10000 + IsServer * 100000 + HasPlayerSlot * 1000000 + IsBroadcasting * 10000000 + HasJoinedGame * 100000000 SpectatorStatus = Spectator + TemporarySpectator * 10 + PureSpectator * 100 + AutoTarget * 1000 + CurrentTargetId * 10000|
|GetPlayerInfo(<br/>&nbsp;&nbsp;&nbsp;&nbsp;a1: String,<br/>&nbsp;&nbsp;&nbsp;&nbsp;a2: i64,<br/>) → [GetPlayerInfo_t](#getplayerinfo)||Returns a struct containing the infos on the player with the specified login, with an optional parameter for compatibility: struct version (0 = united, 1 = forever). The structure is identical to the ones from GetPlayerList. Forever PlayerInfo struct is: Login, NickName, PlayerId, TeamId, SpectatorStatus, LadderRanking, and Flags.  LadderRanking is 0 when not in official mode,  Flags = ForceSpectator(0,1,2) + StereoDisplayMode * 1000 + IsManagedByAnOtherServer * 10000 + IsServer * 100000 + HasPlayerSlot * 1000000 + IsBroadcasting * 10000000 + HasJoinedGame * 100000000 SpectatorStatus = Spectator + TemporarySpectator * 10 + PureSpectator * 100 + AutoTarget * 1000 + CurrentTargetId * 10000|
|GetDetailedPlayerInfo(<br/>&nbsp;&nbsp;&nbsp;&nbsp;a1: String,<br/>) → [GetDetailedPlayerInfo_t](#getdetailedplayerinfo)||Returns a struct containing the infos on the player with the specified login. The structure contains the following fields : Login, NickName, PlayerId, TeamId, IPAddress, DownloadRate, UploadRate, Language, IsSpectator, IsInOfficialMode, a structure named Avatar, an array of structures named Skins, a structure named LadderStats, HoursSinceZoneInscription and OnlineRights (0: nations account, 3: united account). Each structure of the array Skins contains two fields Environnement and a struct PackDesc. Each structure PackDesc, as well as the struct Avatar, contains two fields FileName and Checksum.|
|GetMainServerPlayerInfo(<br/>&nbsp;&nbsp;&nbsp;&nbsp;a1: i64,<br/>) → [GetMainServerPlayerInfo_t](#getmainserverplayerinfo)||Returns a struct containing the player infos of the game server (ie: in case of a basic server, itself; in case of a relay server, the main server), with an optional parameter for compatibility: struct version (0 = united, 1 = forever). The structure is identical to the ones from GetPlayerList. Forever PlayerInfo struct is: Login, NickName, PlayerId, TeamId, SpectatorStatus, LadderRanking, and Flags.  LadderRanking is 0 when not in official mode,  Flags = ForceSpectator(0,1,2) + StereoDisplayMode * 1000 + IsManagedByAnOtherServer * 10000 + IsServer * 100000 + HasPlayerSlot * 1000000 + IsBroadcasting * 10000000 + HasJoinedGame * 100000000 SpectatorStatus = Spectator + TemporarySpectator * 10 + PureSpectator * 100 + AutoTarget * 1000 + CurrentTargetId * 10000|
|GetCurrentRanking(<br/>&nbsp;&nbsp;&nbsp;&nbsp;a1: i64,<br/>&nbsp;&nbsp;&nbsp;&nbsp;a2: i64,<br/>) → T[]||Returns the current rankings for the race in progress. (In trackmania legacy team modes, the scores for the two teams are returned. In other modes, it's the individual players' scores) This method take two parameters. The first parameter specifies the maximum number of infos to be returned, and the second one the starting index in the ranking. The ranking returned is a list of structures. Each structure contains the following fields : Login, NickName, PlayerId and Rank. In addition, for legacy trackmania modes it also contains BestTime, Score, NbrLapsFinished, LadderScore, and an array BestCheckpoints that contains the checkpoint times for the best race.|
|GetCurrentRankingForLogin(<br/>&nbsp;&nbsp;&nbsp;&nbsp;a1: String,<br/>) → T[]||Returns the current ranking for the race in progressof the player with the specified login (or list of comma-separated logins). The ranking returned is a list of structures. Each structure contains the following fields : Login, NickName, PlayerId and Rank. In addition, for legacy trackmania modes it also contains BestTime, Score, NbrLapsFinished, LadderScore, and an array BestCheckpoints that contains the checkpoint times for the best race.|
|GetCurrentWinnerTeam() → i64||Returns the current winning team for the race in progress. (-1: if not in team mode, or draw match)|
|ForceScores(<br/>&nbsp;&nbsp;&nbsp;&nbsp;a1: T[],<br/>&nbsp;&nbsp;&nbsp;&nbsp;a2: bool,<br/>) → bool|Admin|Force the scores of the current game. Only available in rounds and team mode. You have to pass an array of structs \{int PlayerId, int Score}. And a boolean SilentMode - if true, the scores are silently updated, allowing an external controller to do its custom counting...|
|ForcePlayerTeam(<br/>&nbsp;&nbsp;&nbsp;&nbsp;a1: String,<br/>&nbsp;&nbsp;&nbsp;&nbsp;a2: i64,<br/>) → bool|Admin|Force the team of the player. Only available in team mode. You have to pass the login and the team number (0 or 1).|
|ForcePlayerTeamId(<br/>&nbsp;&nbsp;&nbsp;&nbsp;a1: i64,<br/>&nbsp;&nbsp;&nbsp;&nbsp;a2: i64,<br/>) → bool|Admin|Force the team of the player. Only available in team mode. You have to pass the playerid and the team number (0 or 1).|
|ForceSpectator(<br/>&nbsp;&nbsp;&nbsp;&nbsp;a1: String,<br/>&nbsp;&nbsp;&nbsp;&nbsp;a2: i64,<br/>) → bool|Admin|Force the spectating status of the player. You have to pass the login and the spectator mode (0: user selectable, 1: spectator, 2: player, 3: spectator but keep selectable).|
|ForceSpectatorId(<br/>&nbsp;&nbsp;&nbsp;&nbsp;a1: i64,<br/>&nbsp;&nbsp;&nbsp;&nbsp;a2: i64,<br/>) → bool|Admin|Force the spectating status of the player. You have to pass the playerid and the spectator mode (0: user selectable, 1: spectator, 2: player, 3: spectator but keep selectable).|
|ForceSpectatorTarget(<br/>&nbsp;&nbsp;&nbsp;&nbsp;a1: String,<br/>&nbsp;&nbsp;&nbsp;&nbsp;a2: String,<br/>&nbsp;&nbsp;&nbsp;&nbsp;a3: i64,<br/>) → bool|Admin|Force spectators to look at a specific player. You have to pass the login of the spectator (or '' for all) and the login of the target (or '' for automatic), and an integer for the camera type to use (-1 = leave unchanged, 0 = replay, 1 = follow, 2 = free).|
|ForceSpectatorTargetId(<br/>&nbsp;&nbsp;&nbsp;&nbsp;a1: i64,<br/>&nbsp;&nbsp;&nbsp;&nbsp;a2: i64,<br/>&nbsp;&nbsp;&nbsp;&nbsp;a3: i64,<br/>) → bool|Admin|Force spectators to look at a specific player. You have to pass the id of the spectator (or -1 for all) and the id of the target (or -1 for automatic), and an integer for the camera type to use (-1 = leave unchanged, 0 = replay, 1 = follow, 2 = free).|
|SpectatorReleasePlayerSlot(<br/>&nbsp;&nbsp;&nbsp;&nbsp;a1: String,<br/>) → bool|Admin|Pass the login of the spectator. A spectator that once was a player keeps his player slot, so that he can go back to race mode. Calling this function frees this slot for another player to connect.|
|SpectatorReleasePlayerSlotId(<br/>&nbsp;&nbsp;&nbsp;&nbsp;a1: i64,<br/>) → bool|Admin|Pass the playerid of the spectator. A spectator that once was a player keeps his player slot, so that he can go back to race mode. Calling this function frees this slot for another player to connect.|
|GetNetworkStats() → [GetNetworkStats_t](#getnetworkstats)|SuperAdmin|Returns a struct containing the networks stats of the server. The structure contains the following fields : Uptime, NbrConnection, MeanConnectionTime, MeanNbrPlayer, RecvNetRate, SendNetRate, TotalReceivingSize, TotalSendingSize and an array of structures named PlayerNetInfos. Each structure of the array PlayerNetInfos contains the following fields : Login, IPAddress, LastTransferTime, DeltaBetweenTwoLastNetState, PacketLossRate.|
|StartServerLan() → bool|SuperAdmin|Start a server on lan, using the current configuration.|
|StartServerInternet() → bool|SuperAdmin|Start a server on internet, using the current configuration.|

## Structs

### GetVersion

```rust
struct GetVersion_t {};
```

### GetStatus

```rust
struct GetStatus_t {};
```

### GetCurrentCallVote

```rust
struct GetCurrentCallVote_t {};
```

### GetCallVoteTimeOut

```rust
struct GetCallVoteTimeOut_t {};
```

### GetBillState

```rust
struct GetBillState_t {};
```

### GetSystemInfo

```rust
struct GetSystemInfo_t {};
```

### GetMaxPlayers

```rust
struct GetMaxPlayers_t {};
```

### GetMaxSpectators

```rust
struct GetMaxSpectators_t {};
```

### GetLobbyInfo

```rust
struct GetLobbyInfo_t {};
```

### GetTeamInfo

```rust
struct GetTeamInfo_t {};
```

### GetForcedClubLinks

```rust
struct GetForcedClubLinks_t {};
```

### GetDemoTokenInfosForPlayer

```rust
struct GetDemoTokenInfosForPlayer_t {};
```

### SetServerOptions

```rust
struct SetServerOptions_t {};
```

### GetServerOptions

```rust
struct GetServerOptions_t {};
```

### GetForcedMods

```rust
struct GetForcedMods_t {};
```

### GetForcedMusic

```rust
struct GetForcedMusic_t {};
```

### GetModeScriptInfo

```rust
struct GetModeScriptInfo_t {};
```

### GetModeScriptSettings

```rust
struct GetModeScriptSettings_t {};
```

### SetModeScriptSettings

```rust
struct SetModeScriptSettings_t {};
```

### SendModeScriptCommands

```rust
struct SendModeScriptCommands_t {};
```

### SetModeScriptSettingsAndCommands

```rust
struct SetModeScriptSettingsAndCommands_t {};
```

### GetModeScriptVariables

```rust
struct GetModeScriptVariables_t {};
```

### SetModeScriptVariables

```rust
struct SetModeScriptVariables_t {};
```

### SetServerPlugin

```rust
struct SetServerPlugin_t {};
```

### GetServerPlugin

```rust
struct GetServerPlugin_t {};
```

### GetServerPluginVariables

```rust
struct GetServerPluginVariables_t {};
```

### SetServerPluginVariables

```rust
struct SetServerPluginVariables_t {};
```

### GetScriptCloudVariables

```rust
struct GetScriptCloudVariables_t {};
```

### SetScriptCloudVariables

```rust
struct SetScriptCloudVariables_t {};
```

### SetGameInfos

```rust
struct SetGameInfos_t {};
```

### GetCurrentGameInfo

```rust
struct GetCurrentGameInfo_t {};
```

### GetNextGameInfo

```rust
struct GetNextGameInfo_t {};
```

### GetGameInfos

```rust
struct GetGameInfos_t {};
```

### GetForceShowAllOpponents

```rust
struct GetForceShowAllOpponents_t {};
```

### GetScriptName

```rust
struct GetScriptName_t {};
```

### GetCupRoundsPerChallenge

```rust
struct GetCupRoundsPerChallenge_t {};
```

### GetCurrentMapInfo

```rust
struct GetCurrentMapInfo_t {};
```

### GetNextMapInfo

```rust
struct GetNextMapInfo_t {};
```

### GetMapInfo

```rust
struct GetMapInfo_t {};
```

### GetCurrentChallengeInfo

```rust
struct GetCurrentChallengeInfo_t {};
```

### GetNextChallengeInfo

```rust
struct GetNextChallengeInfo_t {};
```

### GetChallengeInfo

```rust
struct GetChallengeInfo_t {};
```

### GetPlayerInfo

```rust
struct GetPlayerInfo_t {};
```

### GetDetailedPlayerInfo

```rust
struct GetDetailedPlayerInfo_t {};
```

### GetMainServerPlayerInfo

```rust
struct GetMainServerPlayerInfo_t {};
```

### GetNetworkStats

```rust
struct GetNetworkStats_t {};
```

