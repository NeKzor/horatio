// Copyright (c) 2023, NeKz
// SPDX-License-Identifier: MIT

// DO NOT EDIT!
// This file has been generated with "deno task ms".

// deno-lint-ignore-file no-empty-interface adjacent-overload-signatures no-namespace no-empty-enum
export type int = number;
export type Void = void;
export type Integer = number;
export type Real = number;
export type Boolean = boolean;
export type Text = string;
export interface Vec2 {
    X: Real;
    Y: Real;
}
export interface Vec3 {
    X: Real;
    Y: Real;
    Z: Real;
}
export interface Int2 {
    X: Integer;
    Y: Integer;
}
export interface Int3 {
    X: Integer;
    Y: Integer;
    Z: Integer;
}
export interface Ident {
}
export interface Array<
    ElemType,
> {
    op_index(Index: Integer): ElemType;
    op_index(Id: Ident): ElemType;
    op_index(Object: CNod): ElemType;
    get(
        Index: Integer,
    ): ElemType;
    get(
        Index: Integer,
        DefaultValue: ElemType,
    ): ElemType;
    get(
        Id: Ident,
    ): ElemType;
    get(
        Id: Ident,
        DefaultValue: ElemType,
    ): ElemType;
    count: Integer;
    sort(): Array<ElemType>;
    sortreverse(): Array<ElemType>;
    add(
        Elem: ElemType,
    ): Void;
    addfirst(
        Elem: ElemType,
    ): Void;
    remove(
        Elem: ElemType,
    ): Boolean;
    exists(
        Elem: ElemType,
    ): Boolean;
    keyof(
        Elem: ElemType,
    ): Integer;
    clear(): Void;
    containsonly(
        Elem: Array<ElemType>,
    ): Boolean;
    containsoneof(
        Elem: Array<ElemType>,
    ): Boolean;
    slice(
        Index: Integer,
    ): Array<ElemType>;
    slice(
        Index: Integer,
        Count: Integer,
    ): Array<ElemType>;
}
export interface AssociativeArray<
    KeyType,
    ElemType,
> {
    op_index(Key: KeyType): ElemType;
    get(
        Key: KeyType,
    ): ElemType;
    get(
        Key: KeyType,
        DefaultValue: ElemType,
    ): ElemType;
    count: Integer;
    sort(): AssociativeArray<KeyType, ElemType>;
    sortreverse(): AssociativeArray<KeyType, ElemType>;
    sortkey(): AssociativeArray<KeyType, ElemType>;
    sortkeyreverse(): AssociativeArray<KeyType, ElemType>;
    remove(
        Elem: ElemType,
    ): Boolean;
    removekey(
        Key: KeyType,
    ): Boolean;
    exists(
        Elem: ElemType,
    ): Boolean;
    existskey(
        Key: KeyType,
    ): Boolean;
    keyof(
        Elem: ElemType,
    ): KeyType;
    clear(): Void;
    containsonly(
        Elem: Array<ElemType>,
    ): Boolean;
    containsoneof(
        Elem: Array<ElemType>,
    ): Boolean;
}
/**
 * Documentation for class CNod
 */
export interface CNod {
    Id: Ident;
}
export interface CMlScript extends CNod {
    Page: CMlPage;
    PageIsVisible: Boolean;
    PageAlwaysUpdateScript: Boolean;
    Now: Integer;
    Period: Integer;
    CurrentTime: Integer;
    /**
     * Local user structure.
     */
    LocalUser: CUser;
    LoadedTitle: CTitle;
    PendingEvents: Array<CMlScriptEvent>;
    Dbg_SetProcessed(
        Event: CMlScriptEvent,
    ): Void;
    Dbg_WarnOnDroppedEvents: Boolean;
    MouseX: Real;
    MouseY: Real;
    MouseLeftButton: Boolean;
    MouseRightButton: Boolean;
    MouseMiddleButton: Boolean;
    KeyUp: Boolean;
    KeyDown: Boolean;
    KeyLeft: Boolean;
    KeyRight: Boolean;
    KeyReturn: Boolean;
    KeySpace: Boolean;
    KeyDelete: Boolean;
    IsKeyPressed(
        KeyCode: Integer,
    ): Boolean;
    EnableMenuNavigationInputs: Boolean;
    EnableMenuNavigation(
        EnableInputs: Boolean,
        WithAutoFocus: Boolean,
        AutoBackControl: CMlControl,
        InputPriority: Integer,
    ): Void;
    EnableMenuNavigation(
        EnableInputs: Boolean,
        WithAutoFocus: Boolean,
        WithManualScroll: Boolean,
        AutoBackControl: CMlControl,
        InputPriority: Integer,
    ): Void;
    IsMenuNavigationForeground: Boolean;
    OpenLink(
        Url: Text,
        LinkType: CMlScript__LinkType,
    ): Void;
    TriggerPageAction(
        ActionString: Text,
    ): Void;
    Xml: CParsingManager;
    Http: CHttpManager;
    Video: CVideoManager;
    Audio: CAudioManager;
    Input: CInputManager;
    DataFileMgr: CDataFileMgr;
    ScoreMgr: CScoreMgr;
    ZoneMgr: CRankingsZoneMgr;
    UserMgr: CUserV2Manager;
    AnimMgr: CAnimManager;
    MenuSceneMgr: CMenuSceneManager;
    System: CSystemPlatform;
    WSNotificationMgr: CWSNotificationManager;
    /**
     * Send a custom event to the owner of the layer.
     */
    SendCustomEvent(
        Type: Text,
        Data: Array<Text>,
    ): Void;
    PreloadImage(
        ImageUrl: Text,
    ): Void;
    PreloadAll(): Void;
    Dbg_DumpDeclareForVariables(
        Nod: CNod,
        StatsOnly: Boolean,
    ): Text;
    FilterProfanities(
        TextToFilter: Text,
    ): Text;
}
export interface CManiaApp extends CNod {
    ManiaAppUrl: Text;
    ManiaAppBaseUrl: Text;
    Now: Integer;
    IsVisible: Boolean;
    LayersDefaultManialinkVersion: Integer;
    LocalUser: CUser;
    LoadedTitle: CTitle;
    EnableMenuNavigationInputs: Boolean;
    UILayers: Array<CUILayer>;
    UILayerCreate(): CUILayer;
    UILayerDestroy(
        Layer: CUILayer,
    ): Void;
    UILayerDestroyAll(): Void;
    LayerCustomEvent(
        Layer: CUILayer,
        Type: Text,
        Data: Array<Text>,
    ): Void;
    OpenLink(
        Url: Text,
        LinkType: CManiaApp__ELinkType,
    ): Void;
    /**
     * Explore to given file or folder. Returns False if it does not exist on the filesystem. (may be because it is in a pack)
     */
    OpenFileInExplorer(
        FileName: Text,
    ): Boolean;
    Dialog_Message(
        Message: Text,
    ): Void;
    Xml: CParsingManager;
    Http: CHttpManager;
    Video: CVideoManager;
    Audio: CAudioManager;
    Input: CInputManager;
    DataFileMgr: CDataFileMgr;
    ScoreMgr: CScoreMgr;
    ZoneMgr: CRankingsZoneMgr;
    TrackingMgr: CTrackingMgr;
    UserMgr: CUserV2Manager;
    WSNotificationMgr: CWSNotificationManager;
    System: CSystemPlatform;
    Dbg_DumpDeclareForVariables(
        Nod: CNod,
        StatsOnly: Boolean,
    ): Text;
    TTS_Disabled: Boolean;
    TTS_Context_Enter(
        Level: Integer,
    ): Ident;
    TTS_Context_Leave(
        ContextId: Ident,
    ): Ident;
    TTS_Context_Change(
        ContextId: Ident,
        Control: CMlControl,
    ): Void;
    TTS_Context_Change(
        ContextId: Ident,
        Text: Text,
        Translate: Boolean,
    ): Void;
    TTS_Context_Read(
        Level: Integer,
    ): Void;
    TTS_Context_Read(
        ContextId: Ident,
    ): Void;
    FilterProfanities(
        TextToFilter: Text,
    ): Text;
}
export interface CAnyEditorPlugin extends CManiaApp {
    PendingEvents: Array<CManiaAppEvent>;
    ModuleEditor: CEditorModule;
    MeshEditor: CEditorMesh;
    EditorEditor: CEditorEditor;
    MediaTracker: CEditorMediaTracker;
    SkinEditor: CEditorSkin;
    InteractionStatus: CAnyEditorPlugin__EInteractionStatus;
}
export interface CEditorMainPlugin extends CAnyEditorPlugin {
    Help_Open(): Void;
    Help_Close(): Void;
    GetPluginHandle(
        Name: Text,
    ): CEditorPluginHandle;
    SendPluginEvent(
        Handle: CEditorPluginHandle,
        Type: Text,
        Data: Array<Text>,
    ): Void;
    Context_SetActive(
        ContextName: Text,
        IsActive: Boolean,
    ): Void;
    Context_IsActive(
        ContextName: Text,
    ): Boolean;
    Binding_IsActive(
        BindingName: Text,
    ): Boolean;
    Binding_IsActive(
        ContextName: Text,
        BindingName: Text,
    ): Boolean;
    Plugin_SetClearance(
        Handle: CEditorPluginHandle,
        API: CEditorMainPlugin__EMeshEditorAPI,
        IsAllowed: Boolean,
    ): Void;
    Plugins: Array<CEditorPluginHandle>;
    Module_Load(
        ModuleName: Text,
    ): Void;
    Modules: Array<CGameModuleEditorBase>;
}
export interface CServerPlugin extends CNod {
    LoadedTitle: CTitle;
    MapInfo: CMapInfo;
    GetClient(
        Login: Text,
    ): CClient;
    GetClient(
        UI: CUIConfig,
    ): CClient;
    GetClient(
        Login: CUser,
    ): CClient;
    GetClientFromWebServicesUserId(
        WebServicesUserId: Text,
    ): CClient;
    /**
     * Currently connected Users.
     */
    Clients: Array<CClient>;
    /**
     * Users connected as spectators.
     */
    Spectators: Array<CClient>;
    /**
     * Users connected as players.
     */
    Players: Array<CClient>;
    GetPlaygroundPlayer(
        Login: Text,
    ): CPlayer;
    /**
     * Sorted scores.
     */
    Scores: Array<CScore>;
    Users: Array<CUser>;
    Teams: Array<CTeam>;
    NeutralEmblemUrl: Text;
    ForcedClubLinkUrl1: Text;
    ForcedClubLinkUrl2: Text;
    TweakTeamColorsToAvoidHueOverlap(): Void;
    ClansNbPlayers: Array<Integer>;
    ClanScores: Array<Integer>;
    Now: Integer;
    PendingEvents: Array<CServerPluginEvent>;
    TriggerModeScriptEvent(
        Type: Text,
        Data: Array<Text>,
    ): Void;
    SendModeScriptCommand(
        CommandName: Text,
        BoolVal: Boolean,
    ): Void;
    SendModeScriptCommand(
        CommandName: Text,
        IntVal: Integer,
    ): Void;
    SendModeScriptCommand(
        CommandName: Text,
        RealVal: Real,
    ): Void;
    SendModeScriptCommand(
        CommandName: Text,
        TextVal: Text,
    ): Void;
    SendModeScriptCommand(
        CommandName: Text,
        Vec2Val: Vec2,
    ): Void;
    SendModeScriptCommand(
        CommandName: Text,
        Vec3Val: Vec3,
    ): Void;
    SendModeScriptCommand(
        CommandName: Text,
        Int2Val: Int2,
    ): Void;
    SendModeScriptCommand(
        CommandName: Text,
        Int3Val: Int3,
    ): Void;
    MapLoaded: Boolean;
    MapUnloadRequested: Boolean;
    MapList: Array<CMapInfo>;
    CurMapIndex: Integer;
    NextMapIndex: Integer;
    RestartMap(): Void;
    NextMap(): Void;
    HoldMapUnloadRequest: Boolean;
    /**
     * Enable minimap on the clients, even if the mode does not do it.
     */
    Client_ComputeMinimap: Boolean;
    UIManager: CUIConfigMgr;
    ServerAdmin: CServerAdmin;
    XmlRpc: CXmlRpc;
    Xml: CParsingManager;
    Http: CHttpManager;
    System: CSystemPlatform;
    Dbg_DumpDeclareForVariables(
        Nod: CNod,
        StatsOnly: Boolean,
    ): Text;
    TaskResults: Array<CTaskResult>;
    TaskResult_Release(
        TaskResultId: Ident,
    ): Void;
    Ghosts: Array<CGhost>;
    Ghost_Download(
        Url: Text,
    ): CTaskResult_Ghost;
    GhostDriver_Playlist_Clear(
        Player: CPlayer,
    ): Void;
    GhostDriver_Playlist_Add(
        Player: CPlayer,
        Ghost: CGhost,
    ): Void;
}
export interface CNotification extends CNod {
    Type: Text;
}
export interface CNotification_Prestige extends CNotification {
}
export namespace NWebServicesPrestige {
    export enum EPrestigeMode {
    }
}
export interface CNotification_PrestigeEarned extends CNotification_Prestige {
    CategoryType: Text;
    CategoryLevel: Integer;
    Mode: NWebServicesPrestige.EPrestigeMode;
    PrestigeId: Text;
    PrestigeLevel: Integer;
    RewardDisplayName: Text;
    RewardFileUrl: Text;
    RewardThumbnailUrl: Text;
    RewardType: Text;
    SkinOptions: Text;
    StatCurrentValue: Integer;
    StatValueForNextLevel: Integer;
    TimeStamp: Integer;
    Year: Integer;
}
export interface CNotification_Squad extends CNotification {
}
export interface CNotification_SquadDeleted extends CNotification_Squad {
    SquadId: Text;
    SquadType: Text;
    TimeStamp: Integer;
}
export interface CNotification_SquadInvitationAccepted extends CNotification_Squad {
    InvitedAccountId: Text;
    InvitedCountryFlagUrl: Text;
    InvitedDisplayName: Text;
    InvitedIsFirstPartyDisplayName: Boolean;
    InvitedSkinOptions: Text;
    InvitedSkinList: Array<CSkinInfo>;
    InvitedWebServicesUserId: Text;
    SquadId: Text;
    SquadType: Text;
    TimeStamp: Integer;
}
export interface CNotification_SquadInvitationAdded extends CNotification_Squad {
    InvitedAccountId: Text;
    InvitedCountryFlagUrl: Text;
    InvitedDisplayName: Text;
    InvitedIsFirstPartyDisplayName: Boolean;
    InvitedWebServicesUserId: Text;
    InviterAccountId: Text;
    InviterCountryFlagUrl: Text;
    InviterDisplayName: Text;
    InviterIsFirstPartyDisplayName: Boolean;
    InviterWebServicesUserId: Text;
    SquadId: Text;
    SquadType: Text;
    TimeStamp: Integer;
}
export interface CNotification_SquadInvitationCanceled extends CNotification_Squad {
    CancelerAccountId: Text;
    CancelerCountryFlagUrl: Text;
    CancelerDisplayName: Text;
    CancelerIsFirstPartyDisplayName: Boolean;
    CancelerWebServicesUserId: Text;
    InvitedAccountId: Text;
    InvitedCountryFlagUrl: Text;
    InvitedDisplayName: Text;
    InvitedIsFirstPartyDisplayName: Boolean;
    InvitedWebServicesUserId: Text;
    SquadId: Text;
    SquadType: Text;
    TimeStamp: Integer;
}
export interface CNotification_SquadInvitationCanceledForExitingPlayer extends CNotification_Squad {
    InvitedAccountId: Text;
    InvitedCountryFlagUrl: Text;
    InvitedDisplayName: Text;
    InvitedIsFirstPartyDisplayName: Boolean;
    InvitedWebServicesUserId: Text;
    SquadId: Text;
    SquadType: Text;
    TimeStamp: Integer;
}
export interface CNotification_SquadInvitationCanceledForFullSquad extends CNotification_Squad {
    InvitedAccountId: Text;
    InvitedCountryFlagUrl: Text;
    InvitedDisplayName: Text;
    InvitedIsFirstPartyDisplayName: Boolean;
    InvitedWebServicesUserId: Text;
    SquadId: Text;
    SquadType: Text;
    TimeStamp: Integer;
}
export interface CNotification_SquadInvitationDeclined extends CNotification_Squad {
    InvitedAccountId: Text;
    InvitedCountryFlagUrl: Text;
    InvitedDisplayName: Text;
    InvitedIsFirstPartyDisplayName: Boolean;
    InvitedWebServicesUserId: Text;
    SquadId: Text;
    SquadType: Text;
    TimeStamp: Integer;
}
export interface CNotification_SquadInvitationReceived extends CNotification_Squad {
    InviterAccountId: Text;
    InviterCountryFlagUrl: Text;
    InviterDisplayName: Text;
    InviterIsFirstPartyDisplayName: Boolean;
    InviterWebServicesUserId: Text;
    SquadId: Text;
    SquadType: Text;
    TimeStamp: Integer;
}
export interface CNotification_SquadLockStateUpdated extends CNotification_Squad {
    SquadId: Text;
    SquadType: Text;
    IsLocked: Boolean;
    TimeStamp: Integer;
}
export interface CNotification_SquadMemberAdded extends CNotification_Squad {
    MemberAccountId: Text;
    MemberCountryFlagUrl: Text;
    MemberDisplayName: Text;
    MemberIsFirstPartyDisplayName: Boolean;
    MemberSkinOptions: Text;
    MemberSkinList: Array<CSkinInfo>;
    MemberWebServicesUserId: Text;
    SquadId: Text;
    SquadType: Text;
    TimeStamp: Integer;
}
export interface CNotification_SquadMemberKicked extends CNotification_Squad {
    KickerAccountId: Text;
    KickerCountryFlagUrl: Text;
    KickerDisplayName: Text;
    KickerIsFirstPartyDisplayName: Boolean;
    KickerWebServicesUserId: Text;
    MemberAccountId: Text;
    MemberCountryFlagUrl: Text;
    MemberDisplayName: Text;
    MemberIsFirstPartyDisplayName: Boolean;
    MemberWebServicesUserId: Text;
    SquadId: Text;
    SquadType: Text;
    TimeStamp: Integer;
}
export interface CNotification_SquadMemberRemoved extends CNotification_Squad {
    MemberAccountId: Text;
    MemberCountryFlagUrl: Text;
    MemberDisplayName: Text;
    MemberIsFirstPartyDisplayName: Boolean;
    MemberWebServicesUserId: Text;
    SquadId: Text;
    SquadType: Text;
    TimeStamp: Integer;
}
export interface CNotification_SquadUpdated extends CNotification_Squad {
    SquadId: Text;
    SquadType: Text;
    LeaderAccountId: Text;
    LeaderWebServicesUserId: Text;
    WasForcedToLeaveDueToCrossPlaySetting: Boolean;
    TimeStamp: Integer;
}
export interface CAccountTrophyGain extends CNod {
    AccountId: Text;
    WebServicesUserId: Text;
    T1Count: Integer;
    T2Count: Integer;
    T3Count: Integer;
    T4Count: Integer;
    T5Count: Integer;
    T6Count: Integer;
    T7Count: Integer;
    T8Count: Integer;
    T9Count: Integer;
    TimeStamp: Integer;
}
export interface CAccountTrophyGainForHistory extends CAccountTrophyGain {
    TrophyAchievement: CTrophyAchievement;
}
export interface CAccountTrophyGainForHistory_CompetitionMatch extends CAccountTrophyGainForHistory {
    Rank: Integer;
    TrophyAchievement_CompetitionMatch: CTrophyAchievement_CompetitionMatch;
}
export interface CAccountTrophyGainForHistory_CompetitionRanking extends CAccountTrophyGainForHistory {
    Rank: Integer;
    TrophyAchievement_CompetitionRanking: CTrophyAchievement_CompetitionRanking;
}
export interface CAccountTrophyGainForHistory_LiveMatch extends CAccountTrophyGainForHistory {
    Rank: Integer;
    TrophyAchievement_LiveMatch: CTrophyAchievement_LiveMatch;
}
export interface CAccountTrophyGainForHistory_SoloMedal extends CAccountTrophyGainForHistory {
    Level: Integer;
    PreviousLevel: Integer;
    TrophyAchievement_SoloMedal: CTrophyAchievement_SoloMedal;
}
export interface CAccountTrophyGainForHistory_SoloRanking extends CAccountTrophyGainForHistory {
    Rank: Integer;
    TrophyAchievement_SoloRanking: CTrophyAchievement_SoloRanking;
}
export interface CTrophyAchievement extends CNod {
    TrophyAchievementId: Text;
    TrophyAchievementType: Text;
}
export interface CTrophyAchievement_CompetitionMatch extends CTrophyAchievement {
    CompetitionId: Text;
    CompetitionMatchInfo: Text;
    CompetitionName: Text;
    CompetitionStage: Text;
    CompetitionStageStep: Text;
    CompetitionType: Text;
    ServerId: Text;
}
export interface CTrophyAchievement_CompetitionRanking extends CTrophyAchievement {
    CompetitionId: Text;
    CompetitionName: Text;
    CompetitionStage: Text;
    CompetitionStageStep: Text;
    CompetitionType: Text;
}
export interface CTrophyAchievement_LiveMatch extends CTrophyAchievement {
    Duration: Integer;
    GameMode: Text;
    GameModeCustomData: Text;
    IsOfficial: Boolean;
    ServerId: Text;
}
export interface CTrophyAchievement_SoloMedal extends CTrophyAchievement {
    SoloMedalAchievementType: Text;
}
export interface CTrophyAchievement_SoloRanking extends CTrophyAchievement {
    MapId: Text;
    SeasonId: Text;
    SoloRankingAchievementType: Text;
}
export interface CMode extends CNod {
    TaskResults: Array<CTaskResult>;
    TaskResult_Release(
        TaskId: Ident,
    ): Void;
    ModeStatusMessage: Text;
    LoadedTitle: CTitle;
    ServerLogin: Text;
    ServerName: Text;
    ServerModeName: Text;
    MapName: Text;
    Map: CMap;
    MapPlayerModelName: Text;
    HasPodium: Boolean;
    Users: Array<CUser>;
    Teams: Array<CTeam>;
    NeutralEmblemUrl: Text;
    ForcedClubLinkUrl1: Text;
    ForcedClubLinkUrl2: Text;
    TweakTeamColorsToAvoidHueOverlap(): Void;
    ClientManiaAppUrl: Text;
    Now: Integer;
    Period: Integer;
    MatchEndRequested: Boolean;
    ServerShutdownRequested: Boolean;
    MapLoaded: Boolean;
    RequestLoadMap(): Void;
    RequestUnloadMap(): Void;
    MapList: Array<CMapInfo>;
    NextMapIndex: Integer;
    UIManager: CUIConfigMgr;
    Hud_Load(
        ModuleName: Text,
    ): Void;
    Hud: CModulePlaygroundHud;
    PassOn(
        EventToPassOn: CUIConfigEvent,
    ): Void;
    Discard(
        EventToDiscard: CUIConfigEvent,
    ): Void;
    Ladder_OpenMatch_Request(): Void;
    Ladder_AddPlayer(
        PlayerScore: CScore,
    ): Void;
    Ladder_OpenMatch_BeginRequest(): Void;
    Ladder_OpenMatch_AddPlayer(
        PlayerScore: CScore,
    ): Void;
    Ladder_OpenMatch_EndRequest(): Void;
    Ladder_CloseMatchRequest(): Void;
    Ladder_CancelMatchRequest(): Void;
    Ladder_RequestInProgress: Boolean;
    Ladder_SetResultsVersion(
        Version: Integer,
    ): Void;
    Ladder_SetMatchMakingMatchId(
        MatchId: Integer,
    ): Void;
    Ladder_EnableChallengeMode(
        Enable: Boolean,
    ): Void;
    Trophy_CompetitionMatch_AddResult(
        WebServicesUserId: Text,
        MatchRank: Integer,
        TrophyRanking: Integer,
    ): Void;
    Trophy_CompetitionMatch_ClearResultList(): Void;
    Trophy_CompetitionMatch_SendResultList(
        CompetitionName: Text,
        CompetitionStage: Text,
        CompetitionStageStep: Text,
        CompetitionMatchInfo: Text,
    ): CTaskResult_AccountTrophyGainList;
    Trophy_LiveTimeAttackAchievement_AddResult(
        WebServicesUserId: Text,
        MatchRank: Integer,
        TrophyRanking: Integer,
    ): Void;
    Trophy_LiveTimeAttackAchievement_ClearResultList(): Void;
    Trophy_LiveTimeAttackAchievement_SendResultList(
        Duration: Integer,
    ): CTaskResult_AccountTrophyGainList;
    ServerAdmin: CServerAdmin;
    AutoTeamBalance(): Void;
    Solo_SetNewRecord(
        PlayerScore: CScore,
        PlayerMedal: CMode__EMedal,
    ): Void;
    Solo_NewRecordSequenceInProgress: Boolean;
    XmlRpc: CXmlRpc;
    Xml: CParsingManager;
    Http: CHttpManager;
    /**
     * Only available for local solo modes.
     */
    Input: CInputManager;
    /**
     * Only available for local solo modes.
     */
    DataFileMgr: CDataFileMgr;
    ScoreMgr: CScoreMgr;
    System: CSystemPlatform;
    UserMgr: CUserV2Manager;
    Synchro_AddBarrier(): Integer;
    Synchro_BarrierReached(
        Barrier: Integer,
    ): Boolean;
    Users_AreAllies(
        User1: CUser,
        User2: CUser,
    ): Boolean;
    Users_RequestSwitchToSpectator(
        User: CUser,
    ): Void;
    Users_CreateFake(
        NickName: Text,
        RequestedTeam: Integer,
    ): CUser;
    Users_DestroyFake(
        User: CUser,
    ): Void;
    Users_SetNbFakeUsers(
        NbTeam1: Integer,
        NbTeam2: Integer,
    ): Void;
    Users_DestroyAllFakes(): Void;
    ItemList_Begin(): Void;
    ItemList_Begin2(): Boolean;
    ItemList_Add(
        ModelName: Text,
    ): Ident;
    /**
     * SkinNameOrUrl: can be 'Skins/Model/....', 'http://....', 'Default' (or '') for item default skin, 'Profile' for the user choice for the model. ModelName: 'DefaultPlayerModel' for the default map model, or the item filename.
     */
    ItemList_AddWithSkin(
        ModelName: Text,
        SkinNameOrUrl: Text,
    ): Ident;
    ItemList_End(): Void;
    DemoToken_StartUsingToken(): Void;
    DemoToken_StopUsingToken(): Void;
    DemoToken_GetAndUseToken(
        User: CUser,
    ): Void;
    ActionList_Begin(): Void;
    ActionList_Begin2(): Boolean;
    ActionList_Add(
        ActionName: Text,
    ): Ident;
    ActionList_End(): Void;
    UseMinimap: Boolean;
    Replay_AutoStart: Boolean;
    Replay_Start(): Void;
    Replay_Stop(): Void;
    TurretsManager: CModeTurretManager;
    VehiclesManager: CModeVehicleManager;
    ActionsManager: CActionManager;
    Activity_Match_Create_Begin(
        ActivityId: Text,
    ): Void;
    Activity_Match_Create_AddPlayer(
        WebServicesUserId: Text,
        TeamName: Text,
    ): Void;
    Activity_Match_Create_AddTeam(
        TeamName: Text,
    ): Void;
    Activity_Match_Create_End(): Void;
    Activity_Match_ReportResult_Begin(): Void;
    Activity_Match_ReportResult_SetPlayerResult(
        WebServicesUserId: Text,
        Rank: Integer,
        Score: Integer,
    ): Void;
    Activity_Match_ReportResult_SetTeamResult(
        TeamName: Text,
        Rank: Integer,
        Score: Integer,
    ): Void;
    Activity_Match_ReportResult_End(): Void;
    EnableGhostRecording: Boolean;
    Ghosts: Array<CGhost>;
    Ghost_Release(
        GhostId: Ident,
    ): Void;
    GhostDriver_Playlist_Clear(
        Player: CPlayer,
    ): Void;
    GhostDriver_Playlist_Add(
        Player: CPlayer,
        Ghost: CGhost,
    ): Void;
    GhostDriver_UploadLimits_Begin(): Void;
    GhostDriver_UploadLimits_AddLevel(
        TeamLevel: Integer,
    ): Void;
    GhostDriver_UploadLimits_End(): CWebServicesTaskResult_GhostDriver_UploadLimits;
    GhostDriver_Upload_Begin(
        TeamLevel: Integer,
    ): Void;
    GhostDriver_Upload_TeamMember_Begin(): Void;
    GhostDriver_Upload_AddGhost(
        Ghost: CGhost,
    ): Void;
    GhostDriver_Upload_TeamMember_End(): Void;
    GhostDriver_Upload_End(): CTaskResult;
    GhostDriver_Download_Begin(): Void;
    GhostDriver_Download_AddRange(
        TeamLevelMin: Integer,
        TeamLevelMax: Integer,
        Count: Integer,
    ): Void;
    GhostDriver_Download_End(): CWebServicesTaskResult_GhostDriver_Download;
    MapRecord_GetListByMapAndPlayerList(
        UserId: Ident,
        WebServicesUserIdList: Array<Text>,
        MapUid: Text,
        ScopeType: Text,
        ScopeId: Text,
        GameMode: Text,
        GameModeCustomData: Text,
    ): CTaskResult_MapRecordList;
    GameScene_ResetAll(): Void;
    Dbg_DumpDeclareForVariables(
        Nod: CNod,
        StatsOnly: Boolean,
    ): Text;
    UiUpdatePeriod: Integer;
}
export interface CSmMode extends Omit<CMode, 'PassOn' | 'Discard'> {
    StartTime: Integer;
    EndTime: Integer;
    SpawnInvulnerabilityDuration: Integer;
    UnspawnAnimDuration: Integer;
    SpawnDelayDuration: Integer;
    RespawnBehaviour: CSmMode__ERespawnBehaviour;
    CheckpointBehaviour: CSmMode__ECheckpointBehaviour;
    GiveUpBehaviour: CSmMode__EGiveUpBehaviour;
    GiveUpBehaviour_RespawnAfter: Boolean;
    GiveUpBehaviour_SkipAfterFinishLine: Boolean;
    /**
     * If not 0, we use this number of laps instead of the number defined in the map
     */
    LapCountOverride: Integer;
    UseMultiClans: Boolean;
    UseClans: Boolean;
    UseForcedClans: Boolean;
    UsePvECollisions: Boolean;
    UsePvPCollisions: Boolean;
    UseGuns: Boolean;
    UsePvPWeapons: Boolean;
    UseInterractiveScreensIn3d: Boolean;
    UseLaserVsBullets: Boolean;
    UseLaserSkewering: Boolean;
    UsePlayerTagging: Boolean;
    UseBeaconsWithRecipients: Boolean;
    UseAmmoBonusOnHit: Boolean;
    UseSameWallJump: Boolean;
    UseDefaultActionEvents: Boolean;
    UseLaunchedCheckpoints: Boolean;
    ReadonlyLaunchedCheckpoints: Boolean;
    CharCanFly: Boolean;
    UseProtectClanmates: Boolean;
    UseAllies: Boolean;
    /**
     * Declare that the game mode will only use forced models, so the client can avoid preloading player own skins.
     */
    DisableDefaultSkinPreload: Boolean;
    GameplayVersion: Integer;
    Gameplay: CSmMode__EGameplay;
    Mood_GetTimeOfDay(): Real;
    Mood_SetTimeOfDay(
        Time01: Real,
    ): Void;
    Mood_GetDayDuration(): Integer;
    Mood_IsNight(): Boolean;
    OffZoneRadius: Real;
    OffZoneRadiusSpeed: Real;
    OffZoneCenterLandmarkId: Ident;
    PlayersNbTotal: Integer;
    PlayersNbAlive: Integer;
    PlayersNbDead: Integer;
    ClansNbTotal: Integer;
    ClansNbAlive: Integer;
    ClansNbDead: Integer;
    ClansNbPlayers: Array<Integer>;
    ClansNbPlayersAlive: Array<Integer>;
    Players: Array<CSmPlayer>;
    BotPlayers: Array<CSmPlayer>;
    Spectators: Array<CSmPlayer>;
    AllPlayers: Array<CSmPlayer>;
    PendingEvents: Array<CSmModeEvent>;
    GetPlayer(
        UI: CUIConfig,
    ): CSmPlayer;
    GetPlayer(
        Login: Text,
    ): CSmPlayer;
    MapBases: Array<CSmMapBase>;
    MapLandmarks: Array<CSmMapLandmark>;
    MapLandmarks_PlayerSpawn: Array<CSmMapLandmark>;
    MapLandmarks_Gauge: Array<CSmMapLandmark>;
    MapLandmarks_Sector: Array<CSmMapLandmark>;
    MapLandmarks_BotPath: Array<CSmMapLandmark>;
    MapLandmarks_BotSpawn: Array<CSmMapLandmark>;
    MapLandmarks_ObjectAnchor: Array<CSmMapLandmark>;
    MapLandmarks_Gate: Array<CSmMapLandmark>;
    MapLandmarks_Foundation: Array<CSmMapLandmark>;
    UiScoresPointsLimit: Integer;
    Scores: Array<CSmScore>;
    ClanScores: Array<Integer>;
    Save_Request(
        FileName: Text,
    ): Void;
    Load_Request(
        FileName: Text,
    ): Void;
    SetPlayer_DelayedIsFull(
        Player: CSmPlayer,
    ): Boolean;
    /**
     * Changes player's vehicle grip with a 250ms delay
     */
    SetPlayer_Delayed_AdherenceCoef(
        Player: CSmPlayer,
        AdherenceCoef: Real,
    ): Void;
    /**
     * Changes player's vehicle control coef with a 250ms delay
     */
    SetPlayer_Delayed_ControlCoef(
        Player: CSmPlayer,
        ControlCoef: Real,
    ): Void;
    /**
     * Changes player's vehicle accel coef with a 250ms delay
     */
    SetPlayer_Delayed_AccelCoef(
        Player: CSmPlayer,
        AccelCoef: Real,
    ): Void;
    /**
     * Changes player's vehicle gravity coef with a 250ms delay
     */
    SetPlayer_Delayed_GravityCoef(
        Player: CSmPlayer,
        GravityCoef: Real,
    ): Void;
    /**
     * Changes the color of the player's vehicle tires with a 250ms delay
     */
    SetPlayer_Delayed_TireWear(
        Player: CSmPlayer,
        TireWear: Real,
    ): Void;
    /**
     * Reset all change from the game mode on the player's vehicle with a 250ms delay
     */
    SetPlayer_Delayed_Reset(
        Player: CSmPlayer,
    ): Void;
    /**
     * Activate or Deactivate NoEngine on the player's vehicle with a 250ms delay
     */
    SetPlayer_Delayed_NoEngine(
        Player: CSmPlayer,
        Activate: Boolean,
    ): Void;
    /**
     * Activate or Deactivate ForceEngine on the player's vehicle with a 250ms delay
     */
    SetPlayer_Delayed_ForceEngine(
        Player: CSmPlayer,
        Activate: Boolean,
    ): Void;
    /**
     * Activate or Deactivate NoBrake on the player's vehicle with a 250ms delay
     */
    SetPlayer_Delayed_NoBrakes(
        Player: CSmPlayer,
        Activate: Boolean,
    ): Void;
    /**
     * Activate or Deactivate NoSteer on the player's vehicle with a 250ms delay
     */
    SetPlayer_Delayed_NoSteer(
        Player: CSmPlayer,
        Activate: Boolean,
    ): Void;
    /**
     * Activate or Deactivate BoostUp on the player's vehicle with a 250ms delay
     */
    SetPlayer_Delayed_BoostUp(
        Player: CSmPlayer,
        Activate: Boolean,
    ): Void;
    /**
     * Activate or Deactivate BoostDown on the player's vehicle with a 250ms delay
     */
    SetPlayer_Delayed_BoostDown(
        Player: CSmPlayer,
        Activate: Boolean,
    ): Void;
    /**
     * Activate or Deactivate Boost2Up on the player's vehicle with a 250ms delay
     */
    SetPlayer_Delayed_Boost2Up(
        Player: CSmPlayer,
        Activate: Boolean,
    ): Void;
    /**
     * Activate or Deactivate Boost2Down on the player's vehicle with a 250ms delay
     */
    SetPlayer_Delayed_Boost2Down(
        Player: CSmPlayer,
        Activate: Boolean,
    ): Void;
    /**
     * Activate or Deactivate SlowMotion on the player's vehicle with a 250ms delay
     */
    SetPlayer_Delayed_SlowMotion(
        Player: CSmPlayer,
        Activate: Boolean,
    ): Void;
    /**
     * Activate or Deactivate Fragile on the player's vehicle with a 250ms delay
     */
    SetPlayer_Delayed_Fragile(
        Player: CSmPlayer,
        Activate: Boolean,
    ): Void;
    /**
     * Activate or Deactivate Cruise at the given speed on the player's vehicle with a 250ms delay
     */
    SetPlayer_Delayed_Cruise(
        Player: CSmPlayer,
        Activate: Boolean,
        CruiseSpeedValue: Real,
    ): Void;
    SetPlayerVehicle_ControlledByMode(
        Player: CSmPlayer,
        Activate: Boolean,
    ): Void;
    SetPlayerVehicle_Accelerate(
        Player: CSmPlayer,
        Activate: Boolean,
    ): Void;
    SetPlayerVehicle_TargetSpeedValue(
        Player: CSmPlayer,
        TargetSpeedValue: Real,
    ): Void;
    SetPlayerVehicle_MaxSpeedValue(
        Player: CSmPlayer,
        MaxSpeedValue: Real,
    ): Void;
    SetPlayerVehicle_BrakeValue(
        Player: CSmPlayer,
        BrakeValue: Real,
    ): Void;
    SetPlayerVehicle_SteerValue(
        Player: CSmPlayer,
        SteerValue: Real,
    ): Void;
    SetPlayerVehicle_ResetControlledModeValues(
        Player: CSmPlayer,
    ): Void;
    SetGameModeNameAndCustomData(
        GameModeName: Text,
    ): Void;
    SetGameModeNameAndCustomData(
        GameModeName: Text,
        Leaderbord_CustomData: Text,
    ): Void;
    SetGameModeNameAndCustomData(
        GameModeName: Text,
        Leaderbord_CustomData: Text,
        GhostDriver_CustomData: Text,
    ): Void;
    SetClubLogoUrl(
        ClubLogoUrl: Text,
    ): Void;
    SetDecoImageUrl_DecalSponsor4x1(
        ImageUrl: Text,
    ): Void;
    SetDecoImageUrl_Screen16x9(
        ImageUrl: Text,
    ): Void;
    SetDecoImageUrl_Screen8x1(
        ImageUrl: Text,
    ): Void;
    SetDecoImageUrl_Screen16x1(
        ImageUrl: Text,
    ): Void;
    PassOn(
        Event: CSmModeEvent,
    ): Void;
    Discard(
        Event: CSmModeEvent,
    ): Void;
    SpawnPlayer(
        Player: CSmPlayer,
        ClanNum: Integer,
        Armor: Integer,
        PlayerSpawn: CMapSpawn,
        ActivationDate: Integer,
    ): Void;
    SpawnPlayer(
        Player: CSmPlayer,
        ClanNum: Integer,
        Turret: CModeTurret,
        ActivationDate: Integer,
    ): Void;
    SpawnPlayer(
        Player: CSmPlayer,
        ClanNum: Integer,
        Vehicle: CModeVehicle,
        ActivationDate: Integer,
    ): Void;
    SpawnPlayer(
        Player: CSmPlayer,
        ClanNum: Integer,
        Vehicle: CModeVehicle,
        SlotIndex: Integer,
        ActivationDate: Integer,
    ): Void;
    SpawnBotPlayer(
        Player: CSmPlayer,
        ClanNum: Integer,
        Armor: Integer,
        PlayerSpawn: CMapSpawn,
        ActivationDate: Integer,
    ): Void;
    SpawnBotPlayer(
        Player: CSmPlayer,
        ClanNum: Integer,
        Armor: Integer,
        BotPath: CMapBotPath,
        ActivationDate: Integer,
    ): Void;
    SpawnBotPlayer(
        Player: CSmPlayer,
        ClanNum: Integer,
        Armor: Integer,
        BotSpawn: CMapBotSpawn,
        ActivationDate: Integer,
    ): Void;
    SpawnBotPlayer(
        Player: CSmPlayer,
        Owner: CSmPlayer,
        Armor: Integer,
        Offset: Vec3,
        ActivationDate: Integer,
    ): Void;
    UnspawnPlayer(
        Player: CSmPlayer,
    ): Void;
    Scores_SortCriteria: CSmMode__ESmScoreSortOrder;
    Scores_AutoUpdateLadderRank: Boolean;
    Scores_AutoUploadPersonalBests: Boolean;
    Scores_SetSortCriteria(
        Criteria: CSmMode__ESmScoreSortOrder,
    ): Void;
    Scores_ComputeLadderRank(
        Criteria: CSmMode__ESmScoreSortOrder,
    ): Void;
    Scores_ClearAll(): Void;
    Score_ClearPrevRace(
        Score: CSmScore,
    ): Void;
    Score_ClearPrevLap(
        Score: CSmScore,
    ): Void;
    Score_Clear(
        Score: CSmScore,
    ): Void;
    SetPlayerClan(
        Player: CSmPlayer,
        ClanNum: Integer,
    ): Void;
    SetPlayerWeapon(
        Player: CSmPlayer,
        DefaultWeapon: CSmMode__EWeapon,
        AutoSwitchWeapon: Boolean,
    ): Void;
    SetPlayerWeaponAvailable(
        Player: CSmPlayer,
        Weapon: CSmMode__EWeapon,
        Available: Boolean,
    ): Void;
    SetPlayerAllWeaponAvailable(
        Player: CSmPlayer,
        Available: Boolean,
    ): Void;
    SetPlayerReloadAllWeapons(
        Player: CSmPlayer,
        ReloadAllWeapons: Boolean,
    ): Void;
    SetPlayerAmmo(
        Player: CSmPlayer,
        Weapon: CSmMode__EWeapon,
        Count: Integer,
    ): Void;
    GetPlayerAmmo(
        Player: CSmPlayer,
        Weapon: CSmMode__EWeapon,
    ): Integer;
    AddPlayerAmmo(
        Player: CSmPlayer,
        Weapon: CSmMode__EWeapon,
        DeltaCount: Real,
    ): Void;
    SetPlayerAmmoMax(
        Player: CSmPlayer,
        Weapon: CSmMode__EWeapon,
        Count: Integer,
    ): Void;
    GetPlayerAmmoMax(
        Player: CSmPlayer,
        Weapon: CSmMode__EWeapon,
    ): Integer;
    Entity_AddArmor(
        Victim: CEntity,
        DeltaArmor: Integer,
        Shooter: CEntity,
        ShooterPoints: Integer,
    ): Void;
    Entity_RemoveArmor(
        Victim: CEntity,
        DeltaArmor: Integer,
        Shooter: CEntity,
        ShooterPoints: Integer,
    ): Void;
    Entity_TriggerTurbo(
        Target: CEntity,
        StartTime: Integer,
    ): Void;
    GetWeaponNum(
        Weapon: CSmMode__EWeapon,
    ): Integer;
    CanRespawnPlayer(
        Player: CSmPlayer,
    ): Boolean;
    RespawnPlayer(
        Player: CSmPlayer,
    ): Void;
    RespawnPlayer(
        Player: CSmPlayer,
        Waypoint: CMapWaypoint,
    ): Void;
    RespawnPlayer(
        Player: CSmPlayer,
        Spawn: CMapSpawn,
    ): Void;
    GiveUpBehaviour_RespawnAfter_SetLandmark(
        Player: CSmPlayer,
        Spawn: CMapSpawn,
        Date: Integer,
    ): Void;
    /**
     * Debug helper: create/destroy bot players to match provided values.  (see Users_SetNbFakeUsers() for fake players that appear and the score table, ...)
     */
    SetNbBotPlayers(
        NbClan1: Integer,
        NbClan2: Integer,
    ): Void;
    CreateBotPlayer(
        ModelId: Ident,
        ClanNum: Integer,
    ): CSmPlayer;
    DestroyBotPlayer(
        BotPlayer: CSmPlayer,
    ): Void;
    DestroyAllBotPlayers(): Void;
    Bots_AutoSpawn: Boolean;
    Bots_AutoRespawn: Boolean;
    Bots_AutoIgnoreBotEvents: Boolean;
    /**
     * Navigation maps are needed for bots to move. If the current map has bot paths or items the navigation maps will always be computed, otherwise you will need to set this explicitely to True. May be necessary if you use CreateBotPlayer or SetNbBotPlayers.
     */
    ForceNavMapsComputation: Boolean;
    /**
     * Allow players to see others with a delay when CrudeExtrapolation is used. The quality of the visuals is better (e.g. cars won't go through walls), but it is not suitable for 'real time' game modes, such as Rounds.
     */
    CrudeExtrapolation_AllowDelay: Boolean;
    ActionGetModelId(
        ActionName: Text,
    ): Ident;
    ActionLoad(
        Player: CSmPlayer,
        ActionSlot: CSmMode__EActionSlot,
        ModelId: Ident,
    ): Void;
    ActionLoad(
        Player: CSmPlayer,
        ActionSlot: CSmMode__EActionSlot,
        ModelId: Ident,
        MeleeMode: Boolean,
    ): Void;
    ActionLoad(
        Vehicle: CModeVehicle,
        VehicleSlotIndex: Integer,
        ActionSlot: CSmMode__EActionSlot,
        ModelId: Ident,
    ): Void;
    ActionLoad(
        Turret: CModeTurret,
        ActionSlot: CSmMode__EActionSlot,
        ModelId: Ident,
    ): Void;
    Action_GetCooldown(
        Player: CSmPlayer,
        ActionInput: CSmMode__EActionInput,
    ): Integer;
    Action_GetRemainingCooldown(
        Player: CSmPlayer,
        ActionInput: CSmMode__EActionInput,
    ): Integer;
    ActionBind(
        Player: CSmPlayer,
        ActionSlot: CSmMode__EActionSlot,
        ActionInput: CSmMode__EActionInput,
    ): Void;
    ActionUnBind(
        Player: CSmPlayer,
        ActionInput: CSmMode__EActionInput,
    ): Void;
    ActionSetVariant1(
        Player: CSmPlayer,
        ActionSlot: CSmMode__EActionSlot,
        ActionVariant: Integer,
    ): Void;
    ActionSetVariant2(
        Player: CSmPlayer,
        ActionSlot: CSmMode__EActionSlot,
        ActionVariant: Integer,
    ): Void;
    ActionSetVariant3(
        Player: CSmPlayer,
        ActionSlot: CSmMode__EActionSlot,
        ActionVariant: Integer,
    ): Void;
    Objects: Array<CSmObject>;
    ObjectCreate(
        ModelId: Ident,
    ): CSmObject;
    ObjectDestroy(
        Object: CSmObject,
    ): Void;
    ObjectDestroyAll(): Void;
    RemoveShieldArmor(
        VictimShieldId: Integer,
        Damage: Integer,
    ): Void;
    Replay_SaveAttackScore(
        Player: CSmPlayer,
        Score: Integer,
    ): Void;
    Replay_SaveDefenseScore(
        Player: CSmPlayer,
        Score: Integer,
    ): Void;
    Replay_SaveTeamScore(
        Team: Integer,
        Score: Integer,
    ): Void;
    Replay_SavePlayerOfInterest(
        Player: CSmPlayer,
    ): Void;
    Replay_SaveWinner(
        Player: CSmPlayer,
    ): Void;
    Replay_SaveInterface(): Void;
    Player_BeginNewRace(
        Player: CSmPlayer,
        AbsoluteTime: Integer,
    ): Void;
    Player_BeginNewLap(
        Player: CSmPlayer,
        RaceTime: Integer,
    ): Void;
    Player_RemoveLastWaypointTime(
        Player: CSmPlayer,
    ): Void;
    Player_AddWaypointTime(
        Player: CSmPlayer,
        Time: Integer,
        Landmark: CSmMapLandmark,
    ): Void;
    Player_SetFinishTime(
        Player: CSmPlayer,
        Time: Integer,
        Landmark: CSmMapLandmark,
    ): Void;
    Player_ClearRaceWaypointTimes(
        Player: CSmPlayer,
    ): Void;
    Player_ClearLapWaypointTimes(
        Player: CSmPlayer,
    ): Void;
    Player_SetPlayerCurRaceAsScoreBestRace(
        Player: CSmPlayer,
    ): Void;
    Player_SetPlayerCurRaceAsScorePrevRace(
        Player: CSmPlayer,
    ): Void;
    Player_SetPlayerCurLapAsScoreBestLap(
        Player: CSmPlayer,
    ): Void;
    Player_SetPlayerCurLapAsScorePrevLap(
        Player: CSmPlayer,
    ): Void;
    Player_SetPlayerPrevLapAsScoreBestLap(
        Player: CSmPlayer,
    ): Void;
    Player_SetPlayerPrevLapAsScorePrevLap(
        Player: CSmPlayer,
    ): Void;
    /**
     * Only available in solo mode and map is loaded.
     */
    GhostMgr: CGhostManager;
    Ghosts_SetStartTime(
        StartTime: Integer,
    ): Void;
    Ghosts_SetMaxAlpha(
        MaxAlpha: Real,
    ): Void;
    Ghost_RetrieveFromPlayer(
        Player: CSmPlayer,
    ): CGhost;
    Ghost_RetrieveFromPlayer(
        Player: CSmPlayer,
        TruncateLaunchedCheckpointsRespawns: Boolean,
    ): CGhost;
    /**
     * Transfer this ghost checkpoint-times to the score best race. The best lap of this ghost is transferred as the score best lap.
     */
    Ghost_CopyToScoreBestRaceAndLap(
        Ghost: CGhost,
        Score: CSmScore,
    ): Void;
    GhostRecorder_SetEnabled(
        Player: CSmPlayer,
        Value: Boolean,
    ): Void;
    GhostRecorder_Ghosts_Select(
        Player: CSmPlayer,
    ): Void;
    GhostRecorder_Clear(
        Player: CSmPlayer,
    ): Void;
    GhostRecorder_Ghosts: Array<CGhost>;
    GhostDriver_Playlist_GetNextSpawn(
        Player: CPlayer,
    ): CSmMapLandmark;
}
export interface CMapEditorPlugin extends CManiaApp {
    PendingEvents: Array<CMapEditorPluginEvent>;
    Map: CMap;
    MapName: Text;
    MapFileName: Text;
    IsEditorReadyForRequest: Boolean;
    BackToMainMenuRequested: Boolean;
    HoldLoadingScreen: Boolean;
    HideOtherPlugins(): Void;
    ShowOtherPlugins(): Void;
    ComputeShadows(): Void;
    ComputeShadows(
        ShadowsQuality: CMapEditorPlugin__ShadowsQuality,
    ): Void;
    CurrentShadowsQuality: CMapEditorPlugin__ShadowsQuality;
    IsUltraShadowsQualityAvailable: Boolean;
    DisplayDefaultSetObjectivesDialog(): Void;
    Undo(): Boolean;
    Redo(): Boolean;
    Help(): Void;
    Validate(): Void;
    AutoSave(): Void;
    Quit(): Void;
    QuickQuit(): Void;
    QuitAndSetResult(
        Type: Text,
        Data: Array<Text>,
    ): Void;
    QuickQuitAndSetResult(
        Type: Text,
        Data: Array<Text>,
    ): Void;
    TestMapFromStart(): Void;
    TestMapFromCoord(
        Coord: Int3,
        Dir: CMapEditorPlugin__CardinalDirections,
    ): Void;
    TestMapFromMacroblockInstance(
        MbInstance: CMacroblockInstance,
    ): Void;
    TestMapWithMode(
        RulesModeName: Text,
    ): Void;
    TestMapWithMode(
        RulesModeName: Text,
        SettingsXml: Text,
    ): Void;
    TestMapWithMode_SplitScreen(
        RulesModeName: Text,
    ): Void;
    TestMapWithMode_SplitScreen(
        RulesModeName: Text,
        ScreenCount: Integer,
    ): Void;
    TestMapWithMode_SplitScreen(
        RulesModeName: Text,
        ScreenCount: Integer,
        FakeCount: Integer,
        SettingsXml: Text,
    ): Void;
    EnableMapTypeStartTest: Boolean;
    SaveMap(
        FileName: Text,
    ): Void;
    SaveMapGamepadEditor(
        FileName: Text,
    ): Void;
    SaveMap(
        FileName: Text,
        Path: Text,
    ): Void;
    PlaceMode: CMapEditorPlugin__PlaceMode;
    EditMode: CMapEditorPlugin__EditMode;
    NextMapElemColor: CMapEditorPlugin__MapElemColor;
    ForceMacroblockColor: Boolean;
    NextItemPhaseOffset: CMapEditorPlugin__PhaseOffset;
    NextMbAdditionalPhaseOffset: CMapEditorPlugin__PhaseOffset;
    NextMapElemLightmapQuality: CMapEditorPlugin__MapElemLightmapQuality;
    ForceMacroblockLightmapQuality: Boolean;
    UndergroundMode: Boolean;
    BlockStockMode: Boolean;
    Inventory: CMapEditorInventory;
    HideInventory: Boolean;
    CameraVAngle: Real;
    CameraHAngle: Real;
    CameraToTargetDistance: Real;
    CameraTargetPosition: Vec3;
    CameraPosition: Vec3;
    ThumbnailCameraVAngle: Real;
    ThumbnailCameraHAngle: Real;
    ThumbnailCameraRoll: Real;
    ThumbnailCameraFovY: Real;
    ThumbnailCameraPosition: Vec3;
    GetRaceCamera(
        Position: Vec3,
        Yaw: Real,
        Pitch: Real,
        Roll: Real,
        FovY: Real,
    ): Boolean;
    EnableAirMapping: Boolean;
    EnableMixMapping: Boolean;
    RemoveAllBlocks(): Void;
    RemoveAllTerrain(): Void;
    RemoveAllOffZone(): Void;
    RemoveAllObjects(): Void;
    RemoveAll(): Void;
    RemoveAllBlocksAndTerrain(): Void;
    ShowCustomSelection(): Void;
    HideCustomSelection(): Void;
    CopyPaste_Copy(): Void;
    CopyPaste_Cut(): Void;
    CopyPaste_Remove(): Void;
    CopyPaste_SelectAll(): Void;
    CopyPaste_ResetSelection(): Void;
    OpenToolsMenu(): Void;
    EditMediatrackIngame(): Void;
    PreloadAllBlocks(): Void;
    PreloadAllItems(): Void;
    CanPlaceBlock(
        BlockModel: CBlockModel,
        Coord: Int3,
        Dir: CMapEditorPlugin__CardinalDirections,
        OnGround: Boolean,
        VariantIndex: Integer,
    ): Boolean;
    PlaceBlock(
        BlockModel: CBlockModel,
        Coord: Int3,
        Dir: CMapEditorPlugin__CardinalDirections,
    ): Boolean;
    CanPlaceGhostBlock(
        BlockModel: CBlockModel,
        Coord: Int3,
        Dir: CMapEditorPlugin__CardinalDirections,
    ): Boolean;
    PlaceGhostBlock(
        BlockModel: CBlockModel,
        Coord: Int3,
        Dir: CMapEditorPlugin__CardinalDirections,
    ): Boolean;
    CanPlaceBlock_NoDestruction(
        BlockModel: CBlockModel,
        Coord: Int3,
        Dir: CMapEditorPlugin__CardinalDirections,
        OnGround: Boolean,
        VariantIndex: Integer,
    ): Boolean;
    PlaceBlock_NoDestruction(
        BlockModel: CBlockModel,
        Coord: Int3,
        Dir: CMapEditorPlugin__CardinalDirections,
    ): Boolean;
    CanPlaceRoadBlocks(
        BlockModel: CBlockModel,
        StartCoord: Int3,
        EndCoord: Int3,
    ): Boolean;
    PlaceRoadBlocks(
        BlockModel: CBlockModel,
        StartCoord: Int3,
        EndCoord: Int3,
    ): Boolean;
    CanPlaceTerrainBlocks(
        BlockModel: CBlockModel,
        StartCoord: Int3,
        EndCoord: Int3,
    ): Boolean;
    PlaceTerrainBlocks(
        BlockModel: CBlockModel,
        StartCoord: Int3,
        EndCoord: Int3,
    ): Boolean;
    PlaceTerrainBlocks_NoDestruction(
        BlockModel: CBlockModel,
        StartCoord: Int3,
        EndCoord: Int3,
    ): Boolean;
    CanPlaceMacroblock(
        MacroblockModel: CMacroblockModel,
        Coord: Int3,
        Dir: CMapEditorPlugin__CardinalDirections,
    ): Boolean;
    PlaceMacroblock(
        MacroblockModel: CMacroblockModel,
        Coord: Int3,
        Dir: CMapEditorPlugin__CardinalDirections,
    ): Boolean;
    PlaceMacroblock_AirMode(
        MacroblockModel: CMacroblockModel,
        Coord: Int3,
        Dir: CMapEditorPlugin__CardinalDirections,
    ): Boolean;
    CanPlaceMacroblock_NoDestruction(
        MacroblockModel: CMacroblockModel,
        Coord: Int3,
        Dir: CMapEditorPlugin__CardinalDirections,
    ): Boolean;
    PlaceMacroblock_NoDestruction(
        MacroblockModel: CMacroblockModel,
        Coord: Int3,
        Dir: CMapEditorPlugin__CardinalDirections,
    ): Boolean;
    CanPlaceMacroblock_NoTerrain(
        MacroblockModel: CMacroblockModel,
        Coord: Int3,
        Dir: CMapEditorPlugin__CardinalDirections,
    ): Boolean;
    PlaceMacroblock_NoTerrain(
        MacroblockModel: CMacroblockModel,
        Coord: Int3,
        Dir: CMapEditorPlugin__CardinalDirections,
    ): Boolean;
    RemoveMacroblock(
        MacroblockModel: CMacroblockModel,
        Coord: Int3,
        Dir: CMapEditorPlugin__CardinalDirections,
    ): Boolean;
    RemoveMacroblock_NoTerrain(
        MacroblockModel: CMacroblockModel,
        Coord: Int3,
        Dir: CMapEditorPlugin__CardinalDirections,
    ): Boolean;
    GetBlock(
        Coord: Int3,
    ): CBlock;
    GetBlock(
        BlockModel: CBlockModel,
        Coord: Int3,
        Dir: CMapEditorPlugin__CardinalDirections,
    ): CBlock;
    GetGhostBlock(
        BlockModel: CBlockModel,
        Coord: Int3,
        Dir: CMapEditorPlugin__CardinalDirections,
    ): CBlock;
    IsBlockModelSkinnable(
        BlockModel: CBlockModel,
    ): Boolean;
    GetNbBlockModelSkins(
        BlockModel: CBlockModel,
    ): Integer;
    GetBlockModelSkin(
        BlockModel: CBlockModel,
        SkinIndex: Integer,
    ): Text;
    IsItemModelSkinnable(
        ItemModel: CGameItemModel,
    ): Boolean;
    GetNbItemModelSkins(
        ItemModel: CGameItemModel,
    ): Integer;
    GetItemModelSkin(
        ItemModel: CGameItemModel,
        SkinIndex: Integer,
    ): Text;
    GetSkinDisplayName(
        SkinFileName: Text,
    ): Text;
    GetBlockSkinBg(
        Block: CBlock,
    ): Text;
    GetBlockSkinFg(
        Block: CBlock,
    ): Text;
    SetBlockSkin(
        Block: CBlock,
        SkinFileName: Text,
    ): Void;
    SetBlockSkins(
        Block: CBlock,
        BgSkinFileName: Text,
        FgSkinFileName: Text,
    ): Void;
    GetItemSkinBg(
        AnchoredObject: CItemAnchor,
    ): Text;
    GetItemSkinFg(
        AnchoredObject: CItemAnchor,
    ): Text;
    SetItemSkin(
        AnchoredObject: CItemAnchor,
        SkinFileName: Text,
    ): Void;
    SetItemSkins(
        AnchoredObject: CItemAnchor,
        BgSkinFileName: Text,
        FgSkinFileName: Text,
    ): Void;
    IsSkinForeground(
        BlockModel: CBlockModel,
        SkinFileName: Text,
    ): Boolean;
    IsSkinForeground(
        ItemModel: CGameItemModel,
        SkinFileName: Text,
    ): Boolean;
    IsMacroblockModelSkinnable(
        BlockModel: CMacroblockModel,
    ): Boolean;
    SetMacroblockSkin(
        Macroblock: CMacroblockInstance,
        SkinFileName: Text,
    ): Boolean;
    OpenBlockSkinDialog(
        Block: CBlock,
    ): Boolean;
    RemoveBlock(
        Coord: Int3,
    ): Boolean;
    RemoveBlock(
        BlockModel: CBlockModel,
        Coord: Int3,
        Dir: CMapEditorPlugin__CardinalDirections,
    ): Boolean;
    RemoveGhostBlock(
        BlockModel: CBlockModel,
        Coord: Int3,
        Dir: CMapEditorPlugin__CardinalDirections,
    ): Boolean;
    RemoveTerrainBlocks(
        StartCoord: Int3,
        EndCoord: Int3,
    ): Boolean;
    GetBlockGroundHeight(
        BlockModel: CBlockModel,
        CoordX: Integer,
        CoordZ: Integer,
        Dir: CMapEditorPlugin__CardinalDirections,
    ): Integer;
    GetGroundHeight(
        CoordX: Integer,
        CoordZ: Integer,
    ): Integer;
    GetMouseCoordOnGround(): Int3;
    GetMouseCoordAtHeight(
        CoordY: Integer,
    ): Int3;
    GetStartLineBlock(): CBlock;
    RemoveItem(
        Item: CAnchorData,
    ): Boolean;
    CopyPaste_AddOrSubSelection(
        StartCoord: Int3,
        EndCoord: Int3,
    ): Void;
    CopyPaste_Symmetrize(): Boolean;
    CopyPaste_GetSelectedCoordsCount(): Integer;
    SaveMacroblock(
        MacroblockModel: CMacroblockModel,
    ): Void;
    CopyPaste_ApplyColorToSelection(
        Color: CMapEditorPlugin__MapElemColor,
    ): Boolean;
    CopyPaste_IncreaseSelectionPhaseOffset(
        Offset: CMapEditorPlugin__PhaseOffset,
    ): Boolean;
    CopyPaste_DecreaseSelectionPhaseOffset(
        Offset: CMapEditorPlugin__PhaseOffset,
    ): Boolean;
    CopyPaste_SetSelectionPhaseOffset(
        Offset: CMapEditorPlugin__PhaseOffset,
    ): Boolean;
    CopyPaste_ApplyLightmapQualityToSelection(
        LightmapQuality: CMapEditorPlugin__MapElemLightmapQuality,
    ): Boolean;
    CopyPaste_GetLightmapQualityInSelection(): Void;
    CopyPaste_GetLightmapQualityInSelection_Results: Array<CMapEditorPlugin__MapElemLightmapQuality>;
    GetMacroblockModelFromFilePath(
        MacroblockModelFilePath: Text,
    ): CMacroblockModel;
    GetTerrainBlockModelFromName(
        TerrainBlockModelName: Text,
    ): CBlockModel;
    GetBlockModelFromName(
        BlockModelName: Text,
    ): CBlockModel;
    CreateFrameClipList(): CBlockClipList;
    CreateFixedClipList(): CBlockClipList;
    UnvalidateMetadata(): Void;
    UnvalidateGameplayInfo(): Void;
    UnvalidatePlayfield(): Void;
    RemoveMacroblock_NoTerrain_NoUnvalidate(
        MacroblockModel: CMacroblockModel,
        Coord: Int3,
        Dir: CMapEditorPlugin__CardinalDirections,
    ): Boolean;
    PlaceMacroblock_NoTerrain_NoUnvalidate(
        MacroblockModel: CMacroblockModel,
        Coord: Int3,
        Dir: CMapEditorPlugin__CardinalDirections,
    ): Boolean;
    ResetAutoRepeat(): Void;
    ComputeItemsForMacroblockInstance(
        MacroBlockInstance: CMacroblockInstance,
    ): Void;
    MacroblockInstanceItemsResults: Array<CItemAnchor>;
    GetConnectResults(
        ExistingBlock: CBlock,
        NewBlock: CBlockModel,
    ): Void;
    GetConnectResults(
        ExistingBlock: CBlock,
        NewBlock: CMacroblockModel,
    ): Void;
    GetConnectResults(
        ExistingBlock: CMacroblockInstance,
        NewBlock: CBlockModel,
    ): Void;
    GetConnectResults(
        ExistingBlock: CMacroblockInstance,
        NewBlock: CMacroblockModel,
    ): Void;
    GetStartBlockCount(
        IncludeMultilaps: Boolean,
    ): Integer;
    GetFinishBlockCount(
        IncludeMultilaps: Boolean,
    ): Integer;
    GetMultilapBlockCount(): Integer;
    GetCheckpointBlockCount(): Integer;
    GetItemsCountResult(): Integer;
    GetItemsCountRequest: Array<Text>;
    CreateMacroblockInstance(
        MacroblockModel: CMacroblockModel,
        Coord: Int3,
        Dir: CMapEditorPlugin__CardinalDirections,
        Color: CMapEditorPlugin__MapElemColor,
        ForceMacroblockColor: Boolean,
    ): CMacroblockInstance;
    CreateMacroblockInstance(
        MacroblockModel: CMacroblockModel,
        Coord: Int3,
        Dir: CMapEditorPlugin__CardinalDirections,
        Color: CMapEditorPlugin__MapElemColor,
        ForceMacroblockColor: Boolean,
        UserData: Integer,
    ): CMacroblockInstance;
    CreateMacroblockInstance(
        MacroblockModel: CMacroblockModel,
        Coord: Int3,
        Dir: CMapEditorPlugin__CardinalDirections,
        DefaultClipList: CBlockClipList,
        Color: CMapEditorPlugin__MapElemColor,
        ForceMacroblockColor: Boolean,
    ): CMacroblockInstance;
    CreateMacroblockInstance(
        MacroblockModel: CMacroblockModel,
        Coord: Int3,
        Dir: CMapEditorPlugin__CardinalDirections,
        DefaultClipList: CBlockClipList,
        Color: CMapEditorPlugin__MapElemColor,
        ForceMacroblockColor: Boolean,
        UserData: Integer,
    ): CMacroblockInstance;
    GetMacroblockInstanceFromOrder(
        Order: Integer,
    ): CMacroblockInstance;
    GetMacroblockInstanceFromUnitCoord(
        Coord: Int3,
    ): CMacroblockInstance;
    GetLatestMacroblockInstance(): CMacroblockInstance;
    GetLatestMacroblockInstance(
        Offset: Integer,
    ): CMacroblockInstance;
    GetMacroblockInstanceConnectedToClip(
        Clip: CBlockClip,
    ): CMacroblockInstance;
    RemoveMacroblockInstance(
        MacroblockInstance: CMacroblockInstance,
    ): Boolean;
    RemoveMacroblockInstanceFromOrder(
        Order: Integer,
    ): Boolean;
    RemoveMacroblockInstanceFromUnitCoord(
        Order: Integer,
    ): Boolean;
    RemoveMacroblockInstancesByUserData(
        UserData: Integer,
    ): Boolean;
    ResetAllMacroblockInstances(): Void;
    GetMaxOrder(): Integer;
    SetMapType(
        MapType: Text,
    ): Boolean;
    GetMapType(): Text;
    SetMapStyle(
        MapStyle: Text,
    ): Void;
    GetMapStyle(): Text;
    GetAvailableMapName(): Text;
    IsMapFileNameAvailable(
        MapName: Text,
    ): Boolean;
    GetVec3FromCoord(
        Coord: Int3,
    ): Vec3;
    Camera: CMapEditorCamera;
    Cursor: CMapEditorCursor;
    Items: Array<CItemAnchor>;
    MediatrackIngameClips: Array<Text>;
    MediatrackIngameEditedClipIndex: Integer;
    Blocks: Array<CBlock>;
    BlockModels: Array<CBlockModel>;
    TerrainBlockModels: Array<CBlockModel>;
    MacroblockModels: Array<CMacroblockModel>;
    ClassicBlocks: Array<CBlock>;
    TerrainBlocks: Array<CBlock>;
    GhostBlocks: Array<CBlock>;
    FixedClipLists: Array<CBlockClipList>;
    FrameClipLists: Array<CBlockClipList>;
    MacroblockInstanceClipLists: Array<CBlockClipList>;
    MacroblockInstances: Array<CMacroblockInstance>;
    ConnectResults: Array<CMapEditorConnectResults>;
    AnchorData: Array<CAnchorData>;
    DoesAnchorHaveSpawn(
        Anchor: CAnchorData,
    ): Boolean;
    CustomSelectionCoords: Array<Int3>;
    CustomSelectionRGB: Vec3;
    EnableEditorInputsCustomProcessing: Boolean;
    EnableCursorShowingWhenInterfaceIsFocused: Boolean;
    HideEditorInterface: Boolean;
    HideBlockHelpers: Boolean;
    ShowPlacementGrid: Boolean;
    IsTesting: Boolean;
    IsValidating: Boolean;
    EditorInputIsDown_Menu: Boolean;
    EditorInputIsDown_SwitchToRace: Boolean;
    EditorInputIsDown_Undo: Boolean;
    EditorInputIsDown_Redo: Boolean;
    EditorInputIsDown_CursorTiltLeft: Boolean;
    EditorInputIsDown_CursorTiltRight: Boolean;
    EditorInputIsDown_CursorUp: Boolean;
    EditorInputIsDown_CursorRight: Boolean;
    EditorInputIsDown_CursorDown: Boolean;
    EditorInputIsDown_CursorLeft: Boolean;
    EditorInputIsDown_CursorRaise: Boolean;
    EditorInputIsDown_CursorLower: Boolean;
    EditorInputIsDown_CursorTurn: Boolean;
    EditorInputIsDown_CursorPick: Boolean;
    EditorInputIsDown_CursorPlace: Boolean;
    EditorInputIsDown_CursorDelete: Boolean;
    EditorInputIsDown_CameraUp: Boolean;
    EditorInputIsDown_CameraRight: Boolean;
    EditorInputIsDown_CameraDown: Boolean;
    EditorInputIsDown_CameraLeft: Boolean;
    EditorInputIsDown_CameraZoomNext: Boolean;
    EditorInputIsDown_Camera0: Boolean;
    EditorInputIsDown_Camera1: Boolean;
    EditorInputIsDown_Camera3: Boolean;
    EditorInputIsDown_Camera7: Boolean;
    EditorInputIsDown_Camera9: Boolean;
    EditorInputIsDown_PivotChange: Boolean;
    EditorInputIsDown_CursorTurnSlightly: Boolean;
    EditorInputIsDown_CursorTurnSlightlyAntiClockwise: Boolean;
    EditorInputIsDown_IconUp: Boolean;
    EditorInputIsDown_IconRight: Boolean;
    EditorInputIsDown_IconDown: Boolean;
    EditorInputIsDown_IconLeft: Boolean;
    EditorInputIsDown_RemoveAll: Boolean;
    EditorInputIsDown_Save: Boolean;
    EditorInputIsDown_SelectAll: Boolean;
    EditorInputIsDown_Copy: Boolean;
    EditorInputIsDown_Cut: Boolean;
    EditorInputIsDown_Paste: Boolean;
    CollectionSquareSize: Real;
    CollectionSquareHeight: Real;
    CollectionGroundY: Integer;
    ValidationStatus: CMapEditorPlugin__ValidationStatus;
    /**
     * Preview the 'RoadsideSpectators' on the bleachers. if -1, use the BleacherSpectatorsAbsoluteCount instead.
     */
    BleacherSpectatorsFillRatio: Real;
    /**
     * Preview the 'RoadsideSpectators' on the bleachers. used if BleacherSpectatorsFillRatio < 0.
     */
    BleacherSpectatorsCount: Integer;
    ManialinkText: Text;
    ManialinkPage: CMlPage;
}
export interface CMapType extends Omit<CMapEditorPlugin, 'ValidationStatus'> {
    CustomEditAnchorData: Boolean;
    ClearMapMetadata(): Void;
    ValidationStatus: CMapType__ValidationStatus;
    ValidabilityRequirementsMessage: Text;
    ValidationEndRequested: Boolean;
    ValidationEndNoConfirm: Boolean;
    RequestEnterPlayground(): Void;
    RequestLeavePlayground(): Void;
    IsSwitchedToPlayground: Boolean;
    UIManager: CUIConfigMgr;
    Users: Array<CUser>;
}
export interface CSmMapType extends CMapType {
    Mode: CSmMode;
    AuthorTime_SetFromGhost(
        Ghost: CGhost,
    ): Void;
    SetAuthorTimeAndGhost(
        Ghost: CGhost,
    ): Void;
    AllPlayers: Array<CSmPlayer>;
    Players: Array<CSmPlayer>;
}
export interface CAction extends CNod {
}
export interface CSmAction extends CAction {
    Now: Integer;
    Variant1: Integer;
    Variant2: Integer;
    Variant3: Integer;
    Players: Array<CSmPlayer>;
    Owner: CSmPlayer;
    OwnerVehicle: CModeVehicle;
    IsActive: Boolean;
    IsBound: Boolean;
    /**
     * Is true only once during action init. Allow to init state variables
     */
    IsInitialFrame: Boolean;
    Energy: Integer;
    EnergyMax: Integer;
    EnergyCost: Integer;
    EnergyReload: Boolean;
    AmmoGain: Real;
    State_EntityId1: Ident;
    State_Integer1: Integer;
    State_Integer2: Integer;
    State_Boolean1: Boolean;
    PendingEvents: Array<CSmActionEvent>;
    IsJumping: Boolean;
    IsGliding: Boolean;
    IsAttractor: Boolean;
    IsFlying: Boolean;
    IsSliding: Boolean;
    IsRunning: Boolean;
    IsFrozen: Boolean;
    IsSneaking: Boolean;
    IsFreeLooking: Boolean;
    HasNoPlayerCollision: Boolean;
    SendRulesEvent(
        Param1: Text,
        Param2: Array<Text>,
        Shooter: CEntity,
        Victim: CEntity,
    ): Void;
    Anim_GetModelId(
        ModelName: Text,
    ): Ident;
    Anim_PlayAtLocation(
        AnimModelId: Ident,
        Position: Vec3,
        Direction: Vec3,
    ): Ident;
    Anim_PlayOnPlayer(
        AnimModelId: Ident,
        Player: CSmPlayer,
    ): Ident;
    Anim_Stop(
        AnimId: Ident,
    ): Void;
    Projectile_GetModelId(
        ModelName: Text,
    ): Ident;
    Projectile_CreateAtLocation(
        ProjectileModelId: Ident,
        PlayerToIgnore: CSmPlayer,
        InitialPosition: Vec3,
        InitialDirection: Vec3,
        InitialVelocity: Vec3,
    ): Ident;
    Projectile_CreateOnPlayer(
        ProjectileModelId: Ident,
        Shooter: CSmPlayer,
    ): Ident;
    Cooldown: Integer;
    Cooldown_IsReady(): Boolean;
    Cooldown_Start(): Void;
    Shield_CreateAtLocation(
        Position: Vec3,
        Direction: Vec3,
    ): Ident;
    Shield_CreateOnPlayer(
        ShieldOwner: CSmPlayer,
    ): Ident;
    Shield_Destroy(
        ShieldId: Ident,
    ): Void;
    Shield_Exists(
        ShieldId: Ident,
    ): Boolean;
    Shield_GetArmor(
        ShieldId: Ident,
    ): Integer;
    Shield_SetArmor(
        ShieldId: Ident,
        ShieldArmor: Integer,
    ): Void;
    Shield_GetIsActive(
        ShieldId: Ident,
    ): Boolean;
    Shield_SetIsActive(
        ShieldId: Ident,
        ShieldIsActive: Boolean,
    ): Void;
    Shield_GetArmorMax(
        ShieldId: Ident,
    ): Integer;
    Shield_GetTickReload(
        ShieldId: Ident,
    ): Integer;
    Shield_GetCooldown(
        ShieldId: Ident,
    ): Integer;
    Vehicle_TriggerTurbo(): Void;
    Vehicle_TriggerTurboBrake(): Void;
    Focus_Request(): Boolean;
    Focus_Release(): Void;
    Focus_Active: Boolean;
    Trigger0: Boolean;
    Trigger1: Boolean;
    Trigger2: Boolean;
    Trigger3: Boolean;
    Trigger4: Boolean;
    Trigger5: Boolean;
    Trigger6: Boolean;
    Trigger7: Boolean;
    Trigger8: Boolean;
    Trigger9: Boolean;
    Trigger10: Boolean;
    Trigger11: Boolean;
    Trigger12: Boolean;
    Trigger13: Boolean;
    Focused_Scroll: Integer;
    Focused_Scroll_Max: Integer;
}
export interface CMlScriptIngame extends CMlScript {
    GameTime: Integer;
    Playground: CPlaygroundClient;
    /**
     * (read-only) UI actually displayed, as defined by the server.
     */
    UI: CUIConfig;
    /**
     * Locally accessible by the client script to locally override settings from the server.
     */
    ClientUI: CUIConfig;
    /**
     * Is in spectator mode - may be only for a short time between rounds.
     */
    IsSpectator: Boolean;
    /**
     * Client actually desires to spectate instead of playing.
     */
    IsSpectatorClient: Boolean;
    UseClans: Boolean;
    UseForcedClans: Boolean;
    /**
     * Will be Null if the script is not runing in a layer of an app.
     */
    ParentApp: CManiaAppPlaygroundCommon;
    Map: CMap;
    ShowCurChallengeCard(): Void;
    ShowModeHelp(): Void;
    CopyServerLinkToClipBoard(): Void;
    JoinTeam1(): Void;
    JoinTeam2(): Void;
    Teams: Array<CTeam>;
    /**
     * Request change of IsSpectatorClient (not immediate, and it may be refused).
     */
    RequestSpectatorClient(
        Spectator: Boolean,
    ): Void;
    /**
     * Set the spectated player, but do not switch to spectator mode automatically. Equivalent to numpad1/2/3/4
     */
    SetSpectateTarget(
        Player: Text,
    ): Void;
    ShowProfile(
        Player: Text,
    ): Void;
    ShowInGameMenu(): Void;
    CloseInGameMenu(
        Result: CMlScriptIngame__EInGameMenuResult,
    ): Void;
    CloseScoresTable(): Void;
    IsInGameMenuDisplayed: Boolean;
    CurrentServerLogin: Text;
    CurrentServerName: Text;
    CurrentServerDesc: Text;
    CurrentServerJoinLink: Text;
    CurrentServerModeName: Text;
    SplitScreenNum: Integer;
    SplitScreenCount: Integer;
    SplitScreenIsHorizontal: Boolean;
    PlayUiSound(
        Sound: CMlScriptIngame__EUISound,
        SoundVariant: Integer,
        Volume: Real,
    ): Void;
}
export interface CSmMlScriptIngame extends CMlScriptIngame {
    ArenaNow: Integer;
    /**
     * Player receiving the inputs. Null if spectating other players.
     */
    InputPlayer: CSmPlayer;
    /**
     * Player currently targetted by the camera. Same as InputPlayer when playing. Can be null in freecam when there's no specific target.
     */
    GUIPlayer: CSmPlayer;
    Players: Array<CSmPlayer>;
    Vehicles: Array<CModeVehicle>;
    Scores: Array<CSmScore>;
    ClanScores: Array<Integer>;
    HideResumePlayingButton: Boolean;
    MapBases: Array<CSmMapBase>;
    MapLandmarks: Array<CSmMapLandmark>;
    MapLandmarks_PlayerSpawn: Array<CSmMapLandmark>;
    MapLandmarks_Gauge: Array<CSmMapLandmark>;
    MapLandmarks_Sector: Array<CSmMapLandmark>;
    MapLandmarks_BotPath: Array<CSmMapLandmark>;
    MapLandmarks_ObjectAnchor: Array<CSmMapLandmark>;
    MapLandmarks_Gate: Array<CSmMapLandmark>;
    MapLandmarks_Foundation: Array<CSmMapLandmark>;
}
export interface CMlScript_ReadOnly extends CNod {
    Page: CMlPage;
    PageIsVisible: Boolean;
    PageAlwaysUpdateScript: Boolean;
    Now: Integer;
    Period: Integer;
    CurrentTime: Integer;
    CurrentTimeText: Text;
    CurrentLocalDateText: Text;
    CurrentTimezone: Text;
    LocalUser: CUser;
    LoadedTitle: CTitle;
    SystemPlatform: CMlScript_ReadOnly__ESystemPlatform;
    SystemSkuIdentifier: CMlScript_ReadOnly__ESystemSkuIdentifier;
    Xml: CParsingManager;
    Video: CVideoManager;
    Input: CInputManager;
    AnimMgr: CAnimManager;
}
export interface CMlScriptIngame_ReadOnly extends CMlScript_ReadOnly {
    GameTime: Integer;
    /**
     * Read-only
     */
    Playground: CPlaygroundClient;
    /**
     * Is in spectator mode - may be only for a short time between rounds.
     */
    IsSpectator: Boolean;
    /**
     * Client actually desires to spectate instead of playing.
     */
    IsSpectatorClient: Boolean;
    UseClans: Boolean;
    UseForcedClans: Boolean;
    Map: CMap;
    Teams: Array<CTeam>;
    IsInGameMenuDisplayed: Boolean;
    CurrentServerLogin: Text;
    CurrentServerName: Text;
    CurrentServerDesc: Text;
    CurrentServerJoinLink: Text;
    CurrentServerModeName: Text;
    SplitScreenNum: Integer;
    SplitScreenCount: Integer;
    SplitScreenIsHorizontal: Boolean;
}
export interface CSmArenaInterfaceManialinkScriptHandler_ReadOnly extends CMlScriptIngame_ReadOnly {
    ArenaNow: Integer;
    /**
     * Player receiving the inputs. Null if spectating other players.
     */
    InputPlayer: CSmPlayer;
    /**
     * Player currently targetted by the camera. Same as InputPlayer when playing. Can be null in freecam when there's no specific target.
     */
    GUIPlayer: CSmPlayer;
    Players: Array<CSmPlayer>;
    Vehicles: Array<CModeVehicle>;
    Scores: Array<CSmScore>;
    MapBases: Array<CSmMapBase>;
    MapLandmarks: Array<CSmMapLandmark>;
    MapLandmarks_PlayerSpawn: Array<CSmMapLandmark>;
    MapLandmarks_Gauge: Array<CSmMapLandmark>;
    MapLandmarks_Sector: Array<CSmMapLandmark>;
    MapLandmarks_BotPath: Array<CSmMapLandmark>;
    MapLandmarks_ObjectAnchor: Array<CSmMapLandmark>;
    MapLandmarks_Gate: Array<CSmMapLandmark>;
    MapLandmarks_Foundation: Array<CSmMapLandmark>;
}
export interface CVoiceChatEvent extends CNod {
}
export interface CVoiceChatEvent_DisplayUI extends CVoiceChatEvent {
    NewValue: Boolean;
}
export interface CVoiceChatEvent_Message extends CVoiceChatEvent {
    Sender: CGameUserVoiceChat;
    Destination: CGameUserVoiceChat;
    Message: Text;
    Lang_BCP47: Text;
}
export interface CVoiceChatEvent_SpeakingUsersChanged extends CVoiceChatEvent {
}
export interface CVoiceChatEvent_User_IsMuted extends CVoiceChatEvent {
    User: CGameUserVoiceChat;
    NewValue: Boolean;
    ChangePending: Boolean;
}
export interface CVoiceChatEvent_User_IsConnected extends CVoiceChatEvent {
    User: CGameUserVoiceChat;
    NewValue: Boolean;
}
export interface CVoiceChatEvent_User_IsSpeaking extends CVoiceChatEvent {
    User: CGameUserVoiceChat;
    NewValue: Boolean;
}
/**
 * Documentation for class CDirectLink
 */
export interface CDirectLink {
}
export interface CDirectLink_JoinSession extends CDirectLink {
    SessionId: Text;
    IsFirstPartySession: Boolean;
    Context: Integer;
}
export interface CDirectLink_WaitingPage extends CDirectLink {
    Reason: Text;
}
export interface CDirectLink_Garage extends CDirectLink {
}
export interface CDirectLink_Splitscreen extends CDirectLink {
}
export interface CDirectLink_Hotseat extends CDirectLink {
}
export interface CDirectLink_ArcadeServer extends CDirectLink {
}
export interface CDirectLink_Royal extends CDirectLink {
}
export interface CDirectLink_Ranked extends CDirectLink {
}
export interface CDirectLink_TrackOfTheDay extends CDirectLink {
}
export interface CDirectLink_JoinServer extends CDirectLink {
    ServerId: Text;
    IsSpectator: Boolean;
}
export interface CDirectLink_OfficialCampaign extends CDirectLink {
}
export interface CDirectLink_NewMap extends CDirectLink {
}
export interface CDirectLink_Home extends CDirectLink {
}
export namespace NGameScriptChat {
    /**
     * Documentation for class SEvent
     */
    export interface SEvent {
    }
    export interface SEvent_NewEntry extends NGameScriptChat.SEvent {
        Entry: SEntry;
    }
    export interface SEvent_HistoryChange extends NGameScriptChat.SEvent {
    }
    export enum EChatScope {
    }
    /**
     * Documentation for class SEntry
     */
    export interface SEntry {
        Text: SConstStringInt;
        SenderLogin: SConstString;
        SenderDisplayName: SConstStringInt;
        SenderFullDisplayName: SConstStringInt;
        SenderFullDisplayName_ForTTS: SConstStringInt;
        SenderTeamColorText: SConstStringInt;
        IsSystemMessage: Boolean;
        ChatScope: NGameScriptChat.EChatScope;
    }
    /**
     * Documentation for class SHistory
     */
    export interface SHistory {
        Entries: Array<NGameScriptChat.SEntry>;
        Window_Size: Integer;
        Window_Offset: Integer;
        Window_OffsetMax: Integer;
        PendingEvents: Array<NGameScriptChat.SEvent>;
    }
    /**
     * Documentation for class SContext
     */
    export interface SContext {
        Histories: Array<NGameScriptChat.SHistory>;
        History_Create(
            Filter: Text,
            MaxSize: Integer,
        ): NGameScriptChat.SHistory;
        History_Destroy(
            History: NGameScriptChat.SHistory,
        ): Void;
    }
}
export interface CAnyEditorPluginLayer extends CMlScript {
    ModuleEditor: CEditorModule;
    MeshEditor: CEditorMesh;
    EditorEditor: CEditorEditor;
    MediaTracker: CEditorMediaTracker;
    SkinEditor: CEditorSkin;
    Binding_GetShortcut(
        ContextName: Text,
        BindingName: Text,
    ): Text;
}
export interface CManiaAppTitleLayer extends CMlScript {
    /**
     * Will be Null if the script is not runing in a layer of an app.
     */
    ParentApp: CManiaAppTitle;
    TitleControl: CTitleControl;
}
export interface CMapEditorPluginLayer extends CMlScript {
    Editor: CMapEditorPlugin;
}
export interface CMlStation extends CMlScript {
    /**
     * Will be Null if the script is not runing in a layer of an app.
     */
    ParentApp: CManiaAppStation;
    Station: CStation;
    EnterStation(): Void;
}
export interface CMlBrowser extends CMlScript {
    /**
     * Will be Null if the script is not runing in a layer of an app.
     */
    ParentApp: CManiaAppBrowser;
    CurMap: CMap;
    ShowCurMapCard(): Void;
    IsInBrowser: Boolean;
    BrowserBack(): Void;
    BrowserQuit(): Void;
    BrowserHome(): Void;
    BrowserReload(): Void;
    BrowserFocusedFrameId: Text;
}
export interface CGameScriptHandlerMediaTrack extends CMlScript {
    /**
     * Info of the map.
     */
    CurMap: CMap;
    ShowCurMapCard(): Void;
}
export interface CMlPage extends CNod {
    MainFrame: CMlFrame;
    GetFirstChild(
        ControlId: Text,
    ): CMlControl;
    FocusedControl: CMlControl;
    LinksInhibited: Boolean;
    GetClassChildren(
        Class: Text,
        Frame: CMlFrame,
        Recursive: Boolean,
    ): Void;
    GetClassChildren_Result: Array<CMlControl>;
    ScrollToControl(
        Control: CMlControl,
    ): Void;
}
export interface CUser extends CNod {
    Login: Text;
    WebServicesUserId: Text;
    Name: Text;
    IsFirstPartyDisplayName: Boolean;
    AvatarUrl: Text;
    ZonePath: Text;
    ZoneFlagUrl: Text;
    CountryFlagUrl: Text;
    CountryPath: Text;
    ZoneIdPath: Array<Text>;
    Language: Text;
    Description: Text;
    Color: Vec3;
    ClubLink: Text;
    Trigram: Text;
    BroadcastTVLogin: Text;
    SteamUserId: Text;
    FameStars: Integer;
    Echelon: CUser__EEchelon;
    NextEchelonPercent: Integer;
    IsBeginner: Boolean;
    LadderRank: Integer;
    LadderTotal: Integer;
    LadderPoints: Real;
    LadderZoneName: Text;
    LadderZoneFlagUrl: Text;
    ReferenceScore: Real;
    IsFakeUser: Boolean;
    Tags_Favored_Indices: Array<Integer>;
    Tags_Id: Array<Text>;
    Tags_Type: Array<CUser__ETagType>;
    Tags_Comments: Array<Text>;
    Tags_Deliverer: Array<Text>;
    ClubTag: Text;
    StereoDisplayMode: CUser__EStereoDisplayMode;
    ColorblindModeEnabled: Boolean;
    HackCamHmdDisabled: Boolean;
    AvatarDisplayName: Text;
    HornDisplayName: Text;
    Model_CarSport_SkinName: Text;
    Model_CarSport_SkinUrl: Text;
    Model_CharacterPilot_SkinName: Text;
    Model_CharacterPilot_SkinUrl: Text;
    Prestige_SkinOptions: Text;
    Character_SkinOptions: Text;
    VoiceChat: CGameUserVoiceChat;
    IsConnectedToMasterServer: Boolean;
    AlliesConnected: Array<Text>;
}
export interface CTitle extends CNod {
    TitleId: Text;
    AuthorLogin: Text;
    AuthorName: Text;
    Name: Text;
    Desc: Text;
    InfoUrl: Text;
    DownloadUrl: Text;
    TitleVersion: Text;
    MakerTitleId: Text;
    BaseTitleId: Text;
}
export interface CBaseConstEvent extends CNod {
    /**
     * Use this flag to solve issues where some events are interpreted twice by different script librairies.<br/>Discard events if the flag is set. Set the flag after handling the event.
     */
    HasBeenProcessed: Boolean;
}
export interface CMlScriptEvent extends CBaseConstEvent {
    Type: CMlScriptEvent__Type;
    KeyCode: Integer;
    KeyName: Text;
    CharPressed: Text;
    ControlId: Text;
    Control: CMlControl;
    MenuNavAction: CMlScriptEvent__EMenuNavAction;
    IsActionAutoRepeat: Boolean;
    CustomEventType: Text;
    CustomEventData: Array<Text>;
}
export interface CMlControl extends CNod {
    Parent: CMlFrame;
    ControlId: Text;
    HasClass(
        Class: Text,
    ): Boolean;
    Size: Vec2;
    HorizontalAlign: CMlControl__AlignHorizontal;
    VerticalAlign: CMlControl__AlignVertical;
    Visible: Boolean;
    RelativePosition_V3: Vec2;
    ZIndex: Real;
    RelativeScale: Real;
    RelativeRotation: Real;
    AbsolutePosition_V3: Vec2;
    AbsoluteScale: Real;
    AbsoluteRotation: Real;
    DataAttributeExists(
        DataName: Text,
    ): Boolean;
    DataAttributeGet(
        DataName: Text,
    ): Text;
    DataAttributeSet(
        DataName: Text,
        DataValue: Text,
    ): Void;
    ToolTip: Text;
    Show(): Void;
    Hide(): Void;
    Focus(): Void;
    ScriptEvents_Disable(): Void;
    ScriptEvents_Restore(): Void;
    IsFocused: Boolean;
}
export interface CParsingManager extends CNod {
    Create(
        Contents: Text,
    ): CParsingDocument;
    Create(
        Contents: Text,
        GenerateText: Boolean,
        GenerateTextRaw: Boolean,
        GenerateTextResursive: Boolean,
    ): CParsingDocument;
    Destroy(
        Document: CParsingDocument,
    ): Void;
    /**
     * Parses an XML document
     */
    Parse_Xml(
        Contents: Text,
    ): CParsingDocument;
    /**
     * Parses an XML document
     */
    Parse_Xml(
        Contents: Text,
        GenerateText: Boolean,
        GenerateTextRaw: Boolean,
        GenerateTextResursive: Boolean,
    ): CParsingDocument;
    Parse_Destroy(
        Document: CParsingDocument,
    ): Void;
    DocumentsSlotsLimit: Integer;
    DocumentsXml: Array<CParsingDocument>;
    Compose_Start_Xml(
        Compact: Boolean,
    ): Ident;
    Compose_Start_Json(
        Compact: Boolean,
    ): Ident;
    Compose_End(
        ComposerId: Ident,
    ): Void;
    Compose_Destroy(
        ComposerId: Ident,
    ): Void;
    Compose_Node_Open(
        ComposerId: Ident,
        Name: Text,
    ): Void;
    Compose_Node_Close(
        ComposerId: Ident,
    ): Void;
    Compose_Array_Open(
        ComposerId: Ident,
        Name: Text,
    ): Void;
    Compose_Array_Close(
        ComposerId: Ident,
    ): Void;
    Compose_Attribute(
        ComposerId: Ident,
        Name: Text,
        Value: Text,
    ): Void;
    Compose_Attribute(
        ComposerId: Ident,
        Name: Text,
        Value: Integer,
    ): Void;
    Compose_Attribute(
        ComposerId: Ident,
        Name: Text,
        Value: Real,
    ): Void;
    Compose_Attribute(
        ComposerId: Ident,
        Name: Text,
        Value: Boolean,
    ): Void;
    Compose_Value(
        ComposerId: Ident,
        Name: Text,
        Value: Text,
    ): Void;
    Compose_GetResult(
        ComposerId: Ident,
    ): Text;
}
export interface CHttpManager extends CNod {
    /**
     * Create a get request, AdditionnalHeaders format is : "Header-name: Value\nOther-name: OtherValue"
     */
    CreateGet(
        Url: Text,
    ): CHttpRequest;
    CreateGet(
        Url: Text,
        UseCache: Boolean,
    ): CHttpRequest;
    CreateGet(
        Url: Text,
        UseCache: Boolean,
        AdditionalHeaders: Text,
    ): CHttpRequest;
    CreatePost(
        Url: Text,
        Resource: Text,
    ): CHttpRequest;
    CreatePost(
        Url: Text,
        Resource: Text,
        AdditionalHeaders: Text,
    ): CHttpRequest;
    CreatePostFile(
        Url: Text,
        FileName: Text,
        AdditionalHeaders: Text,
    ): CHttpRequest;
    Destroy(
        Request: CHttpRequest,
    ): Void;
    IsValidUrl(
        Url: Text,
    ): Boolean;
    Requests: Array<CHttpRequest>;
    SlotsAvailable: Integer;
    PendingEvents: Array<CHttpEvent>;
    AutomaticHeaders_Timezone: Boolean;
}
export interface CVideoManager extends CNod {
    CreateVideo(
        Url: Text,
        IsLooping: Boolean,
        AutoProcessing: Boolean,
    ): CVideo;
    DestroyVideo(
        Video: CVideo,
    ): Void;
    Videos: Array<CVideo>;
}
export interface CAudioManager extends CNod {
    CreateSound(
        Url: Text,
    ): CAudioSource;
    CreateSound(
        Url: Text,
        VolumedB: Real,
        IsMusic: Boolean,
        IsLooping: Boolean,
        IsSpatialized: Boolean,
    ): CAudioSource;
    DestroySound(
        Sound: CAudioSource,
    ): Void;
    Sounds: Array<CAudioSource>;
    CreateMusic(
        Url: Text,
    ): CAudioSourceMusic;
    DestroyMusic(
        Music: CAudioSourceMusic,
    ): Void;
    PlaySoundEvent(
        Sound: CAudioSource,
        VolumedB: Real,
    ): Void;
    PlaySoundEvent(
        Url: Text,
        VolumedB: Real,
    ): Void;
    PlaySoundEvent(
        Sound: CAudioManager__ELibSound,
        SoundVariant: Integer,
        VolumedB: Real,
    ): Void;
    PlaySoundEvent(
        Sound: CAudioSource,
        VolumedB: Real,
        Delay: Integer,
    ): Void;
    PlaySoundEvent(
        Url: Text,
        VolumedB: Real,
        Delay: Integer,
    ): Void;
    PlaySoundEvent(
        Sound: CAudioManager__ELibSound,
        SoundVariant: Integer,
        VolumedB: Real,
        Delay: Integer,
    ): Void;
    PlaySoundEvent(
        Sound: CAudioSource,
        VolumedB: Real,
        PanRadiusLfe: Vec3,
    ): Void;
    PlaySoundEvent(
        Url: Text,
        VolumedB: Real,
        PanRadiusLfe: Vec3,
    ): Void;
    PlaySoundEvent(
        Sound: CAudioSource,
        VolumedB: Real,
        PanRadiusLfe: Vec3,
        Delay: Integer,
    ): Void;
    PlaySoundEvent(
        Url: Text,
        VolumedB: Real,
        PanRadiusLfe: Vec3,
        Delay: Integer,
    ): Void;
    ClearAllDelayedSoundsEvents(): Void;
    ForceEnableMusic: Boolean;
    LimitMusicVolumedB: Real;
    LimitSceneSoundVolumedB: Real;
    LimitUiSoundVolumedB: Real;
}
export interface CInputManager extends CNod {
    PendingEvents: Array<CInputEvent>;
    Now: Integer;
    Period: Integer;
    Pads: Array<CInputPad>;
    MousePos: Vec2;
    MouseKineticScrollVel: Vec2;
    MouseLeftButton: Boolean;
    MouseRightButton: Boolean;
    MouseMiddleButton: Boolean;
    TouchPoints_Cur: Array<Vec2>;
    TouchPoints_Init: Array<Vec2>;
    GetPadButtonPlaygroundBinding(
        Pad: CInputPad,
        Button: CInputManager__EButton,
    ): Text;
    GetPadButtonCurrentBinding(
        Pad: CInputPad,
        Button: CInputManager__EButton,
    ): Text;
    GetActionBindingRaw(
        Pad: CInputPad,
        ActionMap: Text,
        ActionId: Text,
    ): Text;
    GetActionBinding(
        Pad: CInputPad,
        ActionMap: Text,
        ActionId: Text,
    ): Text;
    GetActionDisplayName(
        ActionMap: Text,
        ActionId: Text,
    ): Text;
    JapanStylePadButtons: Boolean;
    ExclusiveMode: Boolean;
    IsKeyPressed(
        KeyCode: Integer,
    ): Boolean;
    LatestActivePad: CInputPad;
    LatestActivePadType: CInputManager__EPadType;
    /**
     * Duration (ms) elapsed since latest user interraction on any device.
     */
    TimeSinceLatestActivity: Integer;
    TimeSinceLatestMouseActivity: Integer;
    TimeSinceLatestTouchActivity: Integer;
    TimeSinceLatestKeyboardActivity: Integer;
    TimeSinceLatestPadActivity: Integer;
}
export interface CDataFileMgr extends CNod {
    /**
     * Array of task results.
     */
    TaskResults: Array<CTaskResult>;
    /**
     * Release a task result no more used.
     */
    TaskResult_Release(
        TaskId: Ident,
    ): Void;
    /**
     * Array of campaigns.
     */
    Campaigns: Array<CCampaign>;
    /**
     * Get a campaign from its id.
     */
    Campaign_Get(
        CampaignId: Text,
    ): CCampaign;
    ItemCollection_Create(
        UserId: Ident,
        ClubId: Text,
        DisplayName: Text,
        FileName: Text,
    ): CTaskResult_NSItemCollection;
    ItemCollection_CreateVersion(
        UserId: Ident,
        ItemCollectionId: Text,
        FileName: Text,
    ): CTaskResult_NSItemCollection;
    ItemCollection_Get(
        UserId: Ident,
        ItemCollectionId: Text,
    ): CTaskResult_NSItemCollection;
    ItemCollection_GetList(
        UserId: Ident,
        ItemCollectionIdList: Array<Text>,
    ): CTaskResult_NSItemCollectionList;
    ItemCollection_GetListByUser(
        UserId: Ident,
        WebServicesUserId: Text,
    ): CTaskResult_NSItemCollectionList;
    ItemCollection_SetActivityId(
        UserId: Ident,
        ItemCollectionId: Text,
        ActivityId: Text,
    ): CTaskResult_NSItemCollection;
    ItemCollection_Update(
        UserId: Ident,
        ItemCollectionId: Text,
        DisplayName: Text,
    ): CTaskResult_NSItemCollection;
    ItemCollection_AddFavorite(
        UserId: Ident,
        ItemCollectionId: Text,
    ): CTaskResult;
    ItemCollection_GetFavoriteList(
        UserId: Ident,
    ): CTaskResult_NSItemCollectionList;
    ItemCollection_RemoveFavorite(
        UserId: Ident,
        ItemCollectionId: Text,
    ): CTaskResult;
    Map_RefreshFromDisk(): Void;
    /**
     * Get the list of map stored in the specified path.
     */
    Map_GetGameList(
        Path: Text,
        Flatten: Boolean,
    ): CTaskResult_MapList;
    /**
     * Get the list of map stored according to the filters in the specified path.
     */
    Map_GetGameList(
        Path: Text,
        Flatten: Boolean,
        SortByNameElseByDate: Boolean,
        SortOrderAsc: Boolean,
    ): CTaskResult_MapList;
    /**
     * Get the list of map stored in the specified path. Scope is used to specify if the list is retrieved from game data (1), title data (2) or user data (4), which can be added).
     */
    Map_GetFilteredGameList(
        Scope: Integer,
        Path: Text,
        Flatten: Boolean,
        SortByNameElseByDate: Boolean,
        SortOrderAsc: Boolean,
    ): CTaskResult_MapList;
    Map_GetAuthorGhost(
        Map: CMap,
    ): CGhost;
    Map_NadeoServices_Get(
        UserId: Ident,
        MapId: Text,
    ): CTaskResult_NSMap;
    Map_NadeoServices_GetFromUid(
        UserId: Ident,
        MapUid: Text,
    ): CTaskResult_NSMap;
    Map_NadeoServices_GetList(
        UserId: Ident,
        MapIdList: Array<Text>,
    ): CTaskResult_NSMapList;
    Map_NadeoServices_GetListFromUid(
        UserId: Ident,
        MapUidList: Array<Text>,
    ): CTaskResult_NSMapList;
    Map_NadeoServices_GetListFromUser(
        UserId: Ident,
        WebServicesUserId: Text,
    ): CTaskResult_NSMapList;
    Map_NadeoServices_Register(
        UserId: Ident,
        MapUid: Text,
    ): CTaskResult_NSMap;
    Skin_NadeoServices_Get(
        UserId: Ident,
        SkinId: Text,
    ): CTaskResult_NSSkin;
    Skin_NadeoServices_GetFromChecksum(
        UserId: Ident,
        SkinChecksum: Text,
    ): CTaskResult_NSSkin;
    Skin_NadeoServices_GetList(
        UserId: Ident,
        SkinIdList: Array<Text>,
    ): CTaskResult_NSSkinList;
    Skin_NadeoServices_GetListFromChecksum(
        UserId: Ident,
        SkinChecksumList: Array<Text>,
    ): CTaskResult_NSSkinList;
    Skin_NadeoServices_GetListFromUser(
        UserId: Ident,
        WebServicesUserId: Text,
    ): CTaskResult_NSSkinList;
    Skin_NadeoServices_Register(
        UserId: Ident,
        SkinDisplayName: Text,
        SkinFileName: Text,
    ): CTaskResult_NSSkin;
    AccountSkin_NadeoServices_AddFavorite(
        UserId: Ident,
        SkinId: Text,
    ): CTaskResult;
    AccountSkin_NadeoServices_GetFavoriteList(
        UserId: Ident,
    ): CTaskResult_NSSkinList;
    AccountSkin_NadeoServices_GetList(
        UserId: Ident,
    ): CTaskResult_NSSkinList;
    AccountSkin_NadeoServices_GetListForUser(
        UserId: Ident,
        WebServicesUserId: Text,
    ): CTaskResult_NSSkinList;
    AccountSkin_NadeoServices_RemoveFavorite(
        UserId: Ident,
        SkinId: Text,
    ): CTaskResult;
    AccountSkin_NadeoServices_Set(
        UserId: Ident,
        SkinId: Text,
    ): CTaskResult_NSSkin;
    AccountSkin_NadeoServices_Unset(
        UserId: Ident,
        SkinType: Text,
    ): CTaskResult;
    /**
     * Array of ghosts.
     */
    Ghosts: Array<CGhost>;
    /**
     * Release a downloaded ghost no longer needed.
     */
    Ghost_Release(
        GhostId: Ident,
    ): Void;
    Ghost_Download(
        FileName: Text,
        Url: Text,
    ): CTaskResult_Ghost;
    Ghost_Upload(
        Url: Text,
        Ghost: CGhost,
        AdditionalHeaders: Text,
    ): CTaskResult;
    Replay_RefreshFromDisk(): Void;
    /**
     * Get the list of replay stored in the specified path.
     */
    Replay_GetGameList(
        Path: Text,
        Flatten: Boolean,
    ): CTaskResult_ReplayList;
    /**
     * Get the list of replay stored according to the filters in the specified path.
     */
    Replay_GetGameList(
        Path: Text,
        Flatten: Boolean,
        SortByNameElseByDate: Boolean,
        SortOrderAsc: Boolean,
    ): CTaskResult_ReplayList;
    /**
     * Get the list of replay stored in the specified path. Scope is used to specify if the list is retrieved from game data (1), title data (2) or user data (4), which can be added.
     */
    Replay_GetFilteredGameList(
        Scope: Integer,
        Path: Text,
        Flatten: Boolean,
        SortByNameElseByDate: Boolean,
        SortOrderAsc: Boolean,
    ): CTaskResult_ReplayList;
    /**
     * Get the list of ghosts from the replay stored at the specified file path.
     */
    Replay_Load(
        Path: Text,
    ): CTaskResult_GhostList;
    /**
     * Save the map and the ghost into a replay file stored at the specified path.
     */
    Replay_Save(
        Path: Text,
        Map: CMap,
        Ghost: CGhost,
    ): CTaskResult;
    Replay_Author_Save(
        Map: CMap,
        Ghost: CGhost,
    ): CTaskResult;
    /**
     * Get the list of media stored in the specified path.
     */
    Media_GetGameList(
        Type: CDataFileMgr__EMediaType,
        Path: Text,
        Flatten: Boolean,
    ): CTaskResult_FileList;
    /**
     * Get the list of media stored according to the filters in the specified path.
     */
    Media_GetGameList(
        Type: CDataFileMgr__EMediaType,
        Path: Text,
        Flatten: Boolean,
        SortByNameElseByDate: Boolean,
        SortOrderAsc: Boolean,
    ): CTaskResult_FileList;
    /**
     * Get the list of media stored in the specified path. Scope is used to specify if the list is retrieved from game data (1), title data (2) or user data (4), which can be added.
     */
    Media_GetFilteredGameList(
        Type: CDataFileMgr__EMediaType,
        Scope: Integer,
        Path: Text,
        Flatten: Boolean,
        SortByNameElseByDate: Boolean,
        SortOrderAsc: Boolean,
    ): CTaskResult_FileList;
    /**
     * Refresh the list of media stored in the specified path. Scope is used to specify if the list is retrieved from game data (1), title data (2) or user data (4), which can be added.
     */
    Media_RefreshFromDisk(
        Type: CDataFileMgr__EMediaType,
        Scope: Integer,
    ): Void;
    GameMode_GetGameList(
        Scope: Integer,
        Path: Text,
        Flatten: Boolean,
    ): CTaskResult_GameModeList;
    Pack_DownloadOrUpdate(
        DisplayName: Text,
        Url: Text,
    ): CTaskResult;
    UserSave_DeleteFile(
        Path: Text,
    ): CTaskResult;
    /**
     * Available space for user files, in kilobytes. (clamped to 1Gb)
     */
    UserSave_AvailableSpace: Integer;
    /**
     * Background write to usersave in progress. Do not switch off the console.
     */
    UserSave_IsWriting: Boolean;
}
export interface CScoreMgr extends CNod {
    /**
     * Array of task results.
     */
    TaskResults: Array<CTaskResult>;
    /**
     * Release a task result no more used.
     */
    TaskResult_Release(
        TaskId: Ident,
    ): Void;
    /**
     * Returns the local status of user records for the specified context.
     */
    ScoreStatus_GetLocalStatusForContext(
        UserId: Ident,
        ScopeType: Text,
        ScopeId: Text,
        GameMode: Text,
        GameModeCustomData: Text,
    ): CScoreMgr__ELocalScoreStatus;
    /**
     * Returns the masterserver status of user records for the specified context.
     */
    ScoreStatus_GetMasterServerStatusForContext(
        UserId: Ident,
        ScopeType: Text,
        ScopeId: Text,
        GameMode: Text,
        GameModeCustomData: Text,
    ): CScoreMgr__EMasterServerScoreStatus;
    /**
     * Returns the ghost currently being recorded for a player on the current playground. (or the latest ghost if the player is not playing.)
     */
    Playground_GetPlayerGhost(
        GamePlayer: CPlayer,
    ): CGhost;
    /**
     * Set a new record for a map.
     */
    Map_SetNewRecord_v2(
        UserId: Ident,
        MapUid: Text,
        GameMode: Text,
        GameModeCustomData: Text,
        Ghost: CGhost,
    ): CTaskResult;
    /**
     * Returns the user record time for a map.
     */
    Map_GetRecord_v2(
        UserId: Ident,
        MapUid: Text,
        ScopeType: Text,
        ScopeId: Text,
        GameMode: Text,
        GameModeCustomData: Text,
    ): Integer;
    /**
     * Returns the user record ghost for  a map.
     */
    Map_GetRecordGhost_v2(
        UserId: Ident,
        MapUid: Text,
        ScopeType: Text,
        ScopeId: Text,
        GameMode: Text,
        GameModeCustomData: Text,
    ): CTaskResult_Ghost;
    /**
     * Returns the number of medals for a map.
     */
    Map_GetMedal(
        UserId: Ident,
        MapUid: Text,
        ScopeType: Text,
        ScopeId: Text,
        GameMode: Text,
        GameModeCustomData: Text,
    ): Integer;
    /**
     * Returns the record score of the medal for a map.
     */
    Map_GetMultiAsyncLevelRecord_v2(
        MapUid: Text,
        ScopeType: Text,
        ScopeId: Text,
        GameMode: Text,
        GameModeCustomData: Text,
        MultiAsyncLevel: Integer,
    ): Integer;
    /**
     * Returns the record ghost of the medal for a map.
     */
    Map_GetMultiAsyncLevelRecordGhost_v2(
        MapUid: Text,
        ScopeType: Text,
        ScopeId: Text,
        GameMode: Text,
        GameModeCustomData: Text,
        MultiAsyncLevel: Integer,
    ): CTaskResult_Ghost;
    /**
     * Returns the skillpoints for a map.
     */
    Map_GetSkillPoints_v2(
        UserId: Ident,
        MapUid: Text,
        ScopeType: Text,
        ScopeId: Text,
        GameMode: Text,
        GameModeCustomData: Text,
    ): Integer;
    Map_GetPlayerListRecordList(
        UserId: Ident,
        WebServicesUserIdList: Array<Text>,
        MapUid: Text,
        ScopeType: Text,
        ScopeId: Text,
        GameMode: Text,
        GameModeCustomData: Text,
    ): CTaskResult_MapRecordList;
    MapLeaderBoard_GetPlayerRankingAsync(
        UserId: Ident,
        MapUid: Text,
        Context: Text,
        Zone: Text,
    ): CWebServicesTaskResult_Natural;
    /**
     * Returns the number of medals for a campaign.
     */
    Campaign_GetMultiAsyncLevel(
        UserId: Ident,
        CampaignId: Text,
    ): Integer;
    /**
     * Returns the number of medals of the specified level for a campaign.
     */
    Campaign_GetMultiAsyncLevelCount(
        UserId: Ident,
        CampaignId: Text,
        MultiAsyncLevel: Integer,
    ): Integer;
    /**
     * Returns the skillpoints for a campaign.
     */
    Campaign_GetSkillPoints(
        UserId: Ident,
        CampaignId: Text,
    ): Integer;
    /**
     * Returns the buddies records for a map of a campaign.
     */
    Campaign_GetBuddiesMapRecord(
        UserId: Ident,
        CampaignId: Text,
        MapUid: Text,
    ): CTaskResult_BuddiesChallengeRecord;
    /**
     * Returns if the buddies records for a map of a campaign are dirty.
     */
    Campaign_IsBuddiesMapRecordDirty(
        UserId: Ident,
        CampaignId: Text,
        MapUid: Text,
    ): Boolean;
    /**
     * Returns the buddies records comparison for a campaign.
     */
    Campaign_GetBuddiesMapRecordsComparison(
        UserId: Ident,
        CampaignId: Text,
    ): CTaskResult_BuddiesChallengeRecordsComparison;
    /**
     * Returns the records comparison with a buddy for a campaign.
     */
    Campaign_GetBuddyMapRecordsComparison(
        UserId: Ident,
        OpponentLogin: Text,
        CampaignId: Text,
    ): CTaskResult_BuddyChallengeRecordsComparison;
    /**
     * Returns the user ranking on a campaign.
     */
    CampaignLeaderBoard_GetPlayerRankingAsync(
        UserId: Ident,
        CampaignId: Text,
        Zone: Text,
        UseSkillPoints: Boolean,
    ): CWebServicesTaskResult_Natural;
    /**
     * Returns the number of user ranked on a campaign.
     */
    CampaignLeaderBoard_GetPlayerCount(
        CampaignId: Text,
        Zone: Text,
        UseSkillPoints: Boolean,
    ): Integer;
    /**
     * Returns a part of the campaign leaderboard.
     */
    CampaignLeaderBoard_GetPlayerList(
        UserId: Ident,
        CampaignId: Text,
        Zone: Text,
        UseSkillPoints: Boolean,
        FromIndex: Integer,
        Count: Integer,
    ): CTaskResult_NaturalLeaderBoardInfoList;
    /**
     * Creates a new season.
     */
    Season_Create(
        UserId: Ident,
        SeasonName: Text,
        GameMode: Text,
        GameModeCustomData: Text,
        MapRecordType: Text,
        StartTimeStamp: Integer,
        EndTimeStamp: Integer,
        MapUidList: Array<Text>,
    ): CTaskResult_Season;
    Season_Update(
        UserId: Ident,
        SeasonId: Text,
        SeasonName: Text,
        GameMode: Text,
        GameModeCustomData: Text,
        MapRecordType: Text,
        StartTimeStamp: Integer,
        EndTimeStamp: Integer,
        MapUidList: Array<Text>,
    ): CTaskResult_Season;
    Season_AddMapList(
        UserId: Ident,
        SeasonId: Text,
        MapUidList: Array<Text>,
    ): CTaskResult_Season;
    Season_RemoveMapList(
        UserId: Ident,
        SeasonId: Text,
        MapUidList: Array<Text>,
    ): CTaskResult_Season;
    /**
     * Returns the season info from a season id.
     */
    Season_Get(
        UserId: Ident,
        SeasonId: Text,
    ): CTaskResult_Season;
    /**
     * Returns a list of season info from a list of season id.
     */
    Season_GetList(
        UserId: Ident,
        SeasonIdList: Array<Text>,
    ): CTaskResult_SeasonList;
    /**
     * Returns the list of created season from a webservices user id.
     */
    Season_GetListFromUser(
        UserId: Ident,
        WebServicesUserId: Text,
    ): CTaskResult_SeasonList;
    /**
     * Loads and synchronizes season scores.
     */
    Season_LoadScore(
        UserId: Ident,
        SeasonId: Text,
    ): CTaskResult;
    /**
     * Loads and synchronizes scores for a list of season.
     */
    Season_LoadScoreList(
        UserId: Ident,
        SeasonIdList: Array<Text>,
    ): CTaskResult;
    /**
     * Add points to multiplayer score.
     */
    Multiplayer_AddToScore(
        UserId: Ident,
        ScoreDiff: Real,
        Timestamp: Integer,
    ): Void;
    /**
     * Returns the multiplayer ranking.
     */
    MultiplayerLeaderBoard_GetPlayerRanking(
        UserId: Ident,
        Zone: Text,
    ): Integer;
    /**
     * Returns the number of user ranked in multiplayer leaderboard.
     */
    MultiplayerLeaderBoard_GetPlayerCount(
        Zone: Text,
    ): Integer;
    /**
     * Returns the user global ranking.
     */
    GlobalLeaderBoard_GetPlayerRanking(
        UserId: Ident,
        Zone: Text,
    ): Integer;
    /**
     * Returns the number of user ranked in global leaderboard.
     */
    GlobalLeaderBoard_GetPlayerCount(
        Zone: Text,
    ): Integer;
    /**
     * Returns a part of the global leaderboard.
     */
    GlobalLeaderBoard_GetPlayerList(
        UserId: Ident,
        Zone: Text,
        FromIndex: Integer,
        Count: Integer,
    ): CTaskResult_RealLeaderBoardInfoList;
    /**
     * Returns the account trophy history.
     */
    Trophy_GetGainHistory(
        UserId: Ident,
        Offset: Integer,
        Count: Integer,
    ): CTaskResult_AccountTrophyGainHistory;
    /**
     * Returns the account trophy history filtered by the specified type.
     */
    Trophy_GetGainHistoryByType(
        UserId: Ident,
        TrophyType: Integer,
        Offset: Integer,
        Count: Integer,
    ): CTaskResult_AccountTrophyGainHistory;
    /**
     * Returns the account trophy summary for the last year.
     */
    Trophy_GetLastYearSummary(
        UserId: Ident,
    ): CTaskResult_AccountTrophyLastYearSummary;
    /**
     * Returns the account trophy summary for the last year for the specified user
     */
    Trophy_GetLastYearSummaryForUser(
        UserId: Ident,
        WebServicesUserId: Text,
    ): CTaskResult_AccountTrophyLastYearSummary;
    /**
     * Returns the trophy solo medal achievement settings
     */
    Trophy_GetSoloMedalAchievementSettings(
        UserId: Ident,
        SoloMedalAchievementType: Text,
    ): CTaskResult_TrophySoloMedalAchievementSettings;
}
export interface CRankingsZoneMgr extends CNod {
    TaskResults: Array<CTaskResult>;
    TaskResult_Release(
        TaskId: Ident,
    ): Void;
    GetPathAndName(
        ZoneFullPath: Text,
        ZonePath: Text,
        ZoneName: Text,
    ): Void;
    GetZoneList(
        ZoneIdList: Array<Text>,
    ): CTaskResult_ZoneList;
    GetChildZoneList(
        ZoneFullPath: Text,
    ): CTaskResult_ZoneList;
    RetrieveUserZoneList(
        UserId: Ident,
        WebServicesUserIdList: Array<Text>,
    ): CTaskResult_UserZoneList;
    SetUserZone(
        UserId: Ident,
        ZoneFullPath: Text,
    ): CTaskResult;
}
export interface CUserV2Manager extends CNod {
    MainUserProfile: CUserV2Profile;
    TaskResults: Array<CTaskResult>;
    TaskResult_Release(
        TaskId: Ident,
    ): Void;
    TaskError_ShowSystemDialog(
        UserId: Ident,
        ErrorCode: Text,
    ): CTaskResult;
    /**
     * NullId for the mainuser.
     */
    GetGroups(
        UserId: Ident,
    ): CTaskResult_StringIntList;
    FindDisplayName(
        WebServicesUserId: Text,
        IsFirstPartyDisplayName: Boolean,
    ): Text;
    MainUserWebServicesInfo: CMasterServerUser;
    ResolveURLShorcut(
        ShortCutId: Text,
    ): Text;
    FindWebServicesUserInfo(
        UserId: Ident,
    ): CMasterServerUser;
    CheckNetworkAvailability(
        UserId: Ident,
    ): CTaskResult;
    IsNetworkAvailable: Boolean;
    ConnectUser(
        UserId: Ident,
    ): CTaskResult_Connect;
    ConnectUser(
        UserId: Ident,
        ForceUbisoftConnectOverlay: Boolean,
    ): CTaskResult_Connect;
    ConnectUser(
        UserId: Ident,
        ForceUbisoftConnectOverlay: Boolean,
        OfflineMode: Boolean,
    ): CTaskResult;
    Commerce_ShowPrimaryStore(
        UserId: Ident,
    ): CTaskResult;
    CrossPlay_IsEnabled(
        UserId: Ident,
    ): CTaskResult_Bool;
    CrossPlay_Setting_GetEnabled(
        UserId: Ident,
    ): Boolean;
    CrossPlay_Setting_SetEnabled(
        UserId: Ident,
        Value: Boolean,
    ): Void;
    CrossPlay_V2_IsEnabled(
        UserId: Ident,
    ): CUserV2Manager__ECrossPlayState;
    CrossPlay_V2_SetEnabled(
        UserId: Ident,
        Enabled: Boolean,
    ): Void;
    Blocklist_CanViewUGC(
        UserId: Ident,
        WebServicesUserId: Text,
    ): Boolean;
    Friend_GetLastChangeIndex(
        UserId: Ident,
    ): Integer;
    Friend_GetList(
        UserId: Ident,
    ): CTaskResult_FriendList;
    LiveSession_GetInfo(
        UserId: Ident,
        SessionId: Text,
    ): CTaskResult_Session_Get;
    News_GetProfileNewsList(
        UserId: Ident,
    ): CTaskResult_UserNewsList;
    News_GetSpaceNewsList(
        UserId: Ident,
    ): CTaskResult_UserNewsList;
    News_OpenLink(
        UserId: Ident,
        Type: Text,
        Param: Text,
    ): CTaskResult;
    Prestige_GetAccountPrestigeList(
        UserId: Ident,
    ): CTaskResult_UserPrestigeList;
    Prestige_GetCurrentAccountPrestige(
        UserId: Ident,
    ): CTaskResult_UserPrestige;
    Prestige_GetCurrentAccountPrestigeForUser(
        UserId: Ident,
        WebServicesUserId: Text,
    ): CTaskResult_UserPrestige;
    Prestige_GetPrestigeList(
        UserId: Ident,
        Mode: CUserV2Manager__EPrestigeMode,
        Year: Integer,
        CategoryType: Text,
    ): CTaskResult_PrestigeList;
    Prestige_SetCurrentAccountPrestige(
        UserId: Ident,
        PrestigeId: Text,
    ): CTaskResult_UserPrestige;
    Prestige_ResetCurrentAccountPrestige(
        UserId: Ident,
    ): CTaskResult_UserPrestige;
    Squad_AcceptInvitation(
        UserId: Ident,
        SquadId: Text,
    ): CTaskResult_Squad;
    Squad_CancelInvitation(
        UserId: Ident,
        SquadId: Text,
        WebServicesUserId: Text,
    ): CTaskResult_Squad;
    Squad_Create(
        UserId: Ident,
        SquadName: Text,
        Size: Integer,
    ): CTaskResult_Squad;
    Squad_Create(
        UserId: Ident,
        SquadName: Text,
        Size: Integer,
        Type: Text,
    ): CTaskResult_Squad;
    Squad_DeclineInvitation(
        UserId: Ident,
        SquadId: Text,
    ): CTaskResult_Squad;
    Squad_Get(
        UserId: Ident,
        SquadId: Text,
    ): CTaskResult_Squad;
    Squad_GetCurrent(
        UserId: Ident,
    ): CTaskResult_Squad;
    Squad_Invite(
        UserId: Ident,
        SquadId: Text,
        WebServicesUserId: Text,
    ): CTaskResult_Squad;
    Squad_JoinSession(
        UserId: Ident,
        SessionId: Text,
        IsFirstPartySession: Boolean,
    ): CTaskResult;
    Squad_Leave(
        UserId: Ident,
        SquadId: Text,
    ): CTaskResult_Squad;
    Squad_RemoveMember(
        UserId: Ident,
        SquadId: Text,
        WebServicesUserId: Text,
    ): CTaskResult_Squad;
    Squad_SetLeader(
        UserId: Ident,
        SquadId: Text,
        WebServicesUserId: Text,
    ): CTaskResult_Squad;
    Squad_SetLocked(
        UserId: Ident,
        SquadId: Text,
        Locked: Boolean,
    ): Void;
    Squad_SetType(
        UserId: Ident,
        SquadId: Text,
        Type: Text,
    ): Void;
    Squad_SetEnabled(
        UserId: Ident,
        Enabled: Boolean,
    ): Void;
    VoiceChat_Events: Array<CVoiceChatEvent>;
    VoiceChat_DisplayUI: Boolean;
    VoiceChat_Mute_Myself: Boolean;
    VoiceChat_MuteAll(): Void;
    VoiceChat_UnmuteAll(): Void;
    VoiceChat_Users: Array<CGameUserVoiceChat>;
    VoiceChat_Users_Local: Array<CGameUserVoiceChat>;
    VoiceChat_Users_Remote: Array<CGameUserVoiceChat>;
    /**
     * List of users currently speaking. Sorted with local users first.
     */
    VoiceChat_Users_Speaking: Array<CGameUserVoiceChat>;
    VoiceChat_Users_Muted: Array<CGameUserVoiceChat>;
    VoiceChat_Users_Remote_Muted: Array<CGameUserVoiceChat>;
    VoiceChat_FindUserFromWebServicesUserId(
        WebServicesUserId: Text,
    ): CGameUserVoiceChat;
    Subscription_GetEndTimeStamp(
        UserId: Ident,
        SubscriptionName: Text,
    ): Integer;
    Subscription_IsRefreshingInfo(
        UserId: Ident,
    ): Boolean;
    Tag_GetClubTag(
        UserId: Ident,
    ): CTaskResult_StringInt;
    Tag_GetClubTagList(
        UserId: Ident,
        WebServicesUserIdList: Array<Text>,
    ): CTaskResult_ClubTagList;
    Tag_SetClubTag(
        UserId: Ident,
        ClubTag: Text,
    ): CTaskResult;
}
export interface CAnimManager extends CNod {
    Add(
        Control: CMlControl,
        XmlTarget: Text,
        StartTime: Integer,
        Duration: Integer,
        EasingFunc: CAnimManager__EAnimManagerEasing,
    ): Void;
    AddChain(
        Control: CMlControl,
        XmlTarget: Text,
        Duration: Integer,
        EasingFunc: CAnimManager__EAnimManagerEasing,
    ): Void;
    Add(
        Control: CMlControl,
        XmlTarget: Text,
        Duration: Integer,
        EasingFunc: CAnimManager__EAnimManagerEasing,
    ): Void;
    Flush(
        Control: CMlControl,
    ): Void;
}
export interface CMenuSceneManager extends CNod {
    /**
     * LayoutFileName: can be 'Default' (or '') for default painter scene, 'Empty' for a simple empty scene, or a filename to game data.
     */
    SceneCreate(
        LayoutFileName: Text,
    ): Ident;
    SceneDestroy(
        SceneId: Ident,
    ): Void;
    CameraSetLocation(
        SceneId: Ident,
        Position: Vec3,
        AngleDeg: Real,
    ): Void;
    CameraSetLocation(
        SceneId: Ident,
        Position: Vec3,
        AngleDeg: Real,
        FovY_Deg: Real,
    ): Void;
    CameraSetFromItem(
        SceneId: Ident,
        ItemId: Ident,
    ): Void;
    LightDir0Set(
        SceneId: Ident,
        sRGB: Vec3,
        Intensity: Real,
    ): Void;
    /**
     * SkinNameOrUrl: can be 'Skins/Model/....', 'http://....', 'Default' (or '') for item default skin, 'Profile' for the user choice for the model. ModelName: item filename.
     */
    ItemCreate(
        SceneId: Ident,
        ModelName: Text,
        SkinName: Text,
        SkinUrl: Text,
    ): Ident;
    /**
     * SkinNameOrUrl: can be 'Skins/Model/....', 'http://....', 'Default' (or '') for item default skin, 'Profile' for the user choice for the model. ModelName: item filename.
     */
    ItemCreate(
        SceneId: Ident,
        ModelName: Text,
        SkinName: Text,
        SkinUrl: Text,
        SkinOptions: Text,
    ): Ident;
    ItemDestroy(
        SceneId: Ident,
        ItemId: Ident,
    ): Void;
    ItemSetLocation(
        SceneId: Ident,
        ItemId: Ident,
        Position: Vec3,
        AngleDeg: Real,
        IsTurntable: Boolean,
    ): Void;
    ItemAttachTo(
        SceneId: Ident,
        ItemId: Ident,
        ParentItemId: Ident,
    ): Void;
    ItemSetVehicleState(
        SceneId: Ident,
        ItemId: Ident,
        Steer: Real,
        Brakes: Boolean,
        FrontLight: Boolean,
        TurboLvl: Integer,
        BoostLvl: Integer,
        BurnoutSmoke: Boolean,
    ): Void;
    ItemSetPlayerState(
        SceneId: Ident,
        ItemId: Ident,
        LightrailColor: Vec3,
        DossardColor: Vec3,
        DossardNumber: Text,
        DossardTrigram: Text,
    ): Void;
    ItemSetPlayerState(
        SceneId: Ident,
        ItemId: Ident,
        User: CUser,
    ): Void;
    ItemTriggerPlayerGesture(
        SceneId: Ident,
        ItemId: Ident,
    ): Void;
    ItemSetPivot(
        SceneId: Ident,
        ItemId: Ident,
        Pivot: Vec3,
    ): Void;
    ItemSetVisible(
        SceneId: Ident,
        ItemId: Ident,
        IsVisible: Boolean,
    ): Void;
    PlaneReflectEnable(
        SceneId: Ident,
        OutOpacity: Real,
        Quad0: CMlQuad,
        Quad1: CMlQuad,
        Quad2: CMlQuad,
        Quad3: CMlQuad,
    ): Void;
    PlaneReflectEnable(
        SceneId: Ident,
        OutOpacity: Real,
        Quad0: CMlQuad,
        Quad1: CMlQuad,
        Quad2: CMlQuad,
        Quad3: CMlQuad,
        HorizonAngleDeg_InCamera: Real,
    ): Void;
    PlaneReflectRefresh(): Void;
    SetBackgroundQuads(
        SceneId: Ident,
        Quad0: CMlQuad,
        Quad1: CMlQuad,
        Quad2: CMlQuad,
        Quad3: CMlQuad,
    ): Void;
    CubeMapSetImage2ds(
        SceneId: Ident,
        RelName0: Text,
        RelName1: Text,
        RelName2: Text,
        RelName3: Text,
    ): Void;
    ColorGradingSetImage2ds(
        SceneId: Ident,
        RelName0: Text,
        RelName1: Text,
        RelName2: Text,
        RelName3: Text,
    ): Void;
    /**
     * iMood: BackgroundQuads
     * AltitudeDeg: 0=horizon, 90=Zenith
     * AzimutDeg: 0=North(+Z), 90=East(-X), 180=South(-Z), 270=West(+X)
     * !! the feature is enabled only when all 4 Moods have been set !!
     */
    MoodLightDir0Set(
        SceneId: Ident,
        iMood: Integer,
        sRGB: Vec3,
        Intensity: Real,
        AltitudeDeg: Real,
        AzimutDeg: Real,
    ): Void;
    /**
     * All scales are [0,1] range
     */
    PodiumTweakShadingSet(
        SceneId: Ident,
        BaseColor: Real,
        CubeReflect: Real,
        PlaneReflect: Real,
    ): Void;
    PostFxSet(
        SceneId: Ident,
        BloomIntensity: Real,
    ): Void;
}
export interface CSystemPlatform extends CNod {
    Platform: CSystemPlatform__ESystemPlatform;
    SkuIdentifier: CSystemPlatform__ESystemSkuIdentifier;
    ExeVersion: Text;
    /**
     * Beware: altough it is a number of seconds since 'local epoch', this is *not a unix timestamp* as it is the time in the local time zone. It is only useful for localized UI.  Use Timelib::GetCurrent() instead if you need an absolute unix timestamp.
     */
    CurrentLocalDate: Integer;
    CurrentLocalDateText: Text;
    CurrentTimezone: Text;
    CurrentTimezoneTimeOffset: Text;
    ExtraTool_Info: Text;
    ExtraTool_Data: Text;
    ClipboardSet(
        ClipboardText: Text,
    ): Void;
    FlashWindow(): Void;
    /**
     * Background write to usersave in progress. Do not switch off the console.
     */
    IsWritingUserSave: Boolean;
}
export interface CWSNotificationManager extends CNod {
    /**
     * Array of task results.
     */
    TaskResults: Array<CTaskResult>;
    /**
     * Release a task result no more used.
     */
    TaskResult_Release(
        TaskId: Ident,
    ): Void;
    /**
     * Check if a notification is available for the specified user.
     */
    Notification_IsAvailable(
        UserId: Ident,
    ): Boolean;
    /**
     * Retrieve the next available notification for the specified user.
     */
    Notification_PopNext(
        UserId: Ident,
    ): CTaskResult_WSNotification;
}
export interface CGameModuleEditorBase extends CManiaApp {
}
export interface CManiaAppTitle extends CManiaApp {
    PendingEvents: Array<CManiaAppEvent>;
    Menu_Quit(): Void;
    Menu_Home(): Void;
    Menu_Solo(): Void;
    Menu_Local(): Void;
    Menu_Internet(): Void;
    Menu_Editor(): Void;
    Menu_Profile(): Void;
    LoadingScreenRequireKeyPressed: Boolean;
    DontScaleMainMenuForHMD: Boolean;
    /**
     * Values in range (0.000000-1.000000)
     */
    FillExtraSpaceWithBluredContents_Opacity: Real;
    TitleControl: CTitleControl;
    /**
     * Only available when editing a title.
     */
    TitleEdition: CTitleEdition;
    Notifications: CNotificationsConsumer;
    ExternalRequest_Type: Text;
    ExternalRequest_Data: Array<Text>;
    /**
     * Call as soon as the request has been consumed and is being processed.
     */
    ExternalRequest_Clear(): Void;
    LogToSessionTrace(
        Text: Text,
    ): Void;
    MatchSettingsManager: CMatchSettingsManager;
    MenuSceneManager: CMenuSceneManager;
    Authentication_GetToken(
        UserId: Ident,
        AppLogin: Text,
    ): Void;
    Authentication_GetTokenResponseReceived: Boolean;
    Authentication_ErrorCode: Integer;
    Authentication_Token: Text;
    Adverts_UsePersonnalData: Boolean;
    Adverts_Enabled: Boolean;
    VoiceChat: CVoiceChatConfig;
}
export interface CUILayer extends CNod {
    IsVisible: Boolean;
    AnimInProgress: Boolean;
    Type: CUILayer__EUILayerType;
    InAnimation: CUILayer__EUILayerAnimation;
    OutAnimation: CUILayer__EUILayerAnimation;
    InOutAnimation: CUILayer__EUILayerAnimation;
    AttachId: Text;
    ManialinkPage: Text;
    LocalPage: CMlPage;
    IsLocalPageScriptRunning: Boolean;
}
export interface CTrackingMgr extends CNod {
    /**
     * Array of task results.
     */
    TaskResults: Array<CTaskResult>;
    /**
     * Release a task result no more used.
     */
    TaskResult_Release(
        TaskId: Ident,
    ): Void;
    /**
     * Track_Context_PlayTime
     */
    Track_Context_PlayTime(
        UserId: Ident,
        PlayTimeContext: CTrackingMgr__EPlayTimeContext,
    ): Void;
    /**
     * Track_Context_MenuStart
     */
    Track_Context_MenuStart(
        UserId: Ident,
        MenuName: Text,
    ): Void;
    /**
     * Track_Context_MenuStop
     */
    Track_Context_MenuStop(
        UserId: Ident,
        MenuName: Text,
    ): Void;
    /**
     * Track_Context_GameModeStart
     */
    Track_Context_GameModeStart(
        UserId: Ident,
        GameMode: Text,
    ): Void;
    /**
     * Track_Context_GameModeStop
     */
    Track_Context_GameModeStop(
        UserId: Ident,
        GameMode: Text,
    ): Void;
    /**
     * Track_Context_MapStart
     */
    Track_Context_MapStart(
        UserId: Ident,
        MapUid: Text,
        Environment: Text,
    ): Void;
    /**
     * Track_Context_MapStop
     */
    Track_Context_MapStop(
        UserId: Ident,
        MapUid: Text,
    ): Void;
    /**
     * Track_Context_PlayStart
     */
    Track_Context_PlayStart(
        UserId: Ident,
        Type: Text,
    ): Void;
    /**
     * Track_Context_PlayStop
     */
    Track_Context_PlayStop(
        UserId: Ident,
        Type: Text,
        Reason: Text,
        NbRespawns: Integer,
    ): Void;
    /**
     * Track_Create_NewMapCreated
     */
    Track_Create_NewMapCreated(
        UserId: Ident,
        Environment: Text,
        IsRandomlyGenerated: Boolean,
    ): Void;
    /**
     * Track_Live_COTDPlayed
     */
    Track_Live_COTDPlayed(
        UserId: Ident,
        Rank: Integer,
        Win: Boolean,
    ): Void;
    /**
     * Track_Live_MultiplayerPlayed
     */
    Track_Live_MultiplayerPlayed(
        UserId: Ident,
        Rank: Integer,
        Win: Boolean,
    ): Void;
    /**
     * Track_Live_RankedPlayed
     */
    Track_Live_RankedPlayed(
        UserId: Ident,
        Rank: Integer,
        Win: Boolean,
    ): Void;
    /**
     * Track_Live_RoyalPlayed_V2
     */
    Track_Live_RoyalPlayed_V2(
        UserId: Ident,
        Rank: Integer,
        Win: Boolean,
        IsSuperRoyal: Boolean,
        Division: Text,
    ): Void;
    /**
     * Track_Live_RoyalSectionFinished_V2
     */
    Track_Live_RoyalSectionFinished_V2(
        UserId: Ident,
        ColorLevel: CTrackingMgr__EEventColorLevel,
    ): Void;
    /**
     * Track_Local_HotseatPlayed_V2
     */
    Track_Local_HotseatPlayed_V2(
        UserId: Ident,
    ): Void;
    /**
     * Track_Local_SplitScreenPlayed_V2
     */
    Track_Local_SplitScreenPlayed_V2(
        UserId: Ident,
    ): Void;
    /**
     * Track_News_PlayerAction
     */
    Track_News_PlayerAction(
        UserId: Ident,
        NewsId: Text,
        Placement: Text,
        Action: Text,
    ): Void;
    /**
     * Track_News_PlayerImpression
     */
    Track_News_PlayerImpression(
        UserId: Ident,
        NewsId: Text,
        Placement: Text,
        Duration: Integer,
    ): Void;
    /**
     * Track_Player_MedalEarned
     */
    Track_Player_MedalEarned(
        UserId: Ident,
        Finished: Integer,
        BronzeMedal: Integer,
        SilverMedal: Integer,
        GoldMedal: Integer,
        AuthorMedal: Integer,
        IsOfficialCampaign: Boolean,
        IsTOTD: Boolean,
    ): Void;
    /**
     * Track_Player_OfficialCampaign10TrackCompleted
     */
    Track_Player_OfficialCampaign10TrackCompleted(
        UserId: Ident,
        Year: Integer,
        Season: CTrackingMgr__EEventSeason,
        MedalLevel: CTrackingMgr__EEventMedalLevel,
    ): Void;
    /**
     * Track_Player_OfficialCampaignAllTrackCompleted_V2
     */
    Track_Player_OfficialCampaignAllTrackCompleted_V2(
        UserId: Ident,
        Year: Integer,
        Season: CTrackingMgr__EEventSeason,
        MedalLevel: CTrackingMgr__EEventMedalLevel,
    ): Void;
    /**
     * Track_Player_TrackOfTheDayWeekAllTrackCompleted_V2
     */
    Track_Player_TrackOfTheDayWeekAllTrackCompleted_V2(
        UserId: Ident,
        Year: Integer,
        Week: Integer,
        MedalLevel: CTrackingMgr__EEventMedalLevel,
    ): Void;
    /**
     * Track_Player_TrophyEarned
     */
    Track_Player_TrophyEarned(
        UserId: Ident,
        T1CountPtr: Integer,
        T2CountPtr: Integer,
        T3CountPtr: Integer,
        T4CountPtr: Integer,
        T5CountPtr: Integer,
        T6CountPtr: Integer,
        T7CountPtr: Integer,
        T8CountPtr: Integer,
        T9CountPtr: Integer,
    ): Void;
    /**
     * Track_Player_StartActivity
     */
    Track_Player_StartActivity(
        UserId: Ident,
        ActivityId: Text,
    ): Void;
    /**
     * Track_Player_EndActivity
     */
    Track_Player_EndActivity(
        UserId: Ident,
        ActivityId: Text,
    ): Void;
}
export interface CEditorPluginHandle extends CNod {
}
export interface CMapInfo extends CNod {
    MapUid: Text;
    Comments: Text;
    CopperPrice: Integer;
    CollectionName: Text;
    AuthorLogin: Text;
    AuthorNickName: Text;
    AuthorZonePath: Text;
    AuthorZoneFlagUrl: Text;
    AuthorCountryFlagUrl: Text;
    MapType: Text;
    MapStyle: Text;
    Unlocked: Boolean;
    IsPlayable: Boolean;
    CreatedWithSimpleEditor: Boolean;
    CreatedWithPartyEditor: Boolean;
    CreatedWithGamepadEditor: Boolean;
    TMObjective_AuthorTime: Integer;
    TMObjective_GoldTime: Integer;
    TMObjective_SilverTime: Integer;
    TMObjective_BronzeTime: Integer;
    TMObjective_NbLaps: Integer;
    TMObjective_IsLapRace: Boolean;
    Name: Text;
    Path: Text;
    FileName: Text;
}
export interface CClient extends CNod {
    User: CUser;
    UI: CUIConfig;
    /**
     * Otherwise, it's a LAN account not currently authentified with the masterserver.
     */
    IsConnectedToMasterServer: Boolean;
    ClientVersion: Text;
    ClientTitleVersion: Text;
    IsSpectator: Boolean;
    /**
     * Duration during which the player is not active while they should be (AFK).
     */
    IdleDuration: Integer;
}
export interface CUIConfig extends CNod {
    UISequence: CUIConfig__EUISequence;
    UISequenceIsCompleted: Boolean;
    UISequence_CustomMTClip: Text;
    UISequence_CustomMTRefTime: Integer;
    UISequence_CanSkipIntroMT: Boolean;
    UISequence_PodiumPlayersWin: Text;
    UISequence_PodiumPlayersLose: Text;
    UISequence_CutSceneStyle: CUIConfig__ECutSceneStyle;
    DisableZoomTransitions: Boolean;
    ManialinkPage: Text;
    BigMessage: Text;
    BigMessageAvatarLogin: Text;
    BigMessageAvatarVariant: CUIConfig__EAvatarVariant;
    BigMessageSound: CUIConfig__EUISound;
    BigMessageSoundVariant: Integer;
    StatusMessage: Text;
    GaugeMessage: Text;
    GaugeRatio: Real;
    GaugeClan: Integer;
    /**
     * An XML text describing the map tooltips appearing in the HUD.<br/>It's a set of &lt;marker/&gt; elements which can have the following attributes : <ol><li>label : a text to display</li><li>pos : a vector of 3 world coordinates desribing the position of the marker</li><li>playerlogin : alternatively, instead of using pos, you can use a player login. The marker will smoothly follow the player</li><li>playerid : similar to playerlogin. Fill it with Player.MarkerId. The marker will smoothly follow the player</li><li>box : a vector of 3 dimensions describing the size of the marked object (allows a better placement of the marker on the screen)</li><li>gauge : a Real. If between 0. and 1. a gauge will be shown undeneath the text</li><li>imageurl : a string. URL of an image to use</li><li>distmax : a real. The marker will disappear if the dist to it is greater than distmax</li><li>isturning : a bool. Only for markers attached to players. If the marker appear on a minimap, it will turn around to reflect the player orientation.</li></ol>
     */
    MarkersXML: Text;
    /**
     * If True, the markers of this UI config overrides the markers of more generic UI configs.
     * If False they are merged.
     */
    OverrideMarkers: Boolean;
    Markers: Array<CUIConfigMarker>;
    UILayers: Array<CUILayer>;
    OverlayHideNotices: Boolean;
    OverlayHideMapInfo: Boolean;
    OverlayHideChat: Boolean;
    OverlayHideCountdown: Boolean;
    OverlayHideCrosshair: Boolean;
    OverlayHideGauges: Boolean;
    OverlayHideConsumables: Boolean;
    OverlayHide321Go: Boolean;
    OverlayMute321Go: Boolean;
    OverlayHideEndMapLadderRecap: Boolean;
    OverlayHideSpectatorInfos: Boolean;
    /**
     * Values in range (0 - 40)
     */
    OverlayChatLineCount: Integer;
    OverlayChatOffset: Vec2;
    /**
     * Values in range (0.100000-10.000000)
     */
    OverlayChatWidthCoef: Real;
    CountdownCoord: Vec2;
    NoticesFilter_HidePlayerInfo: Boolean;
    NoticesFilter_HidePlayerWarning: Boolean;
    NoticesFilter_HidePlayerInfoIfNotMe: Boolean;
    NoticesFilter_HidePlayerWarningIfNotMe: Boolean;
    NoticesFilter_HideMapInfo: Boolean;
    NoticesFilter_HideMapWarning: Boolean;
    NoticesFilter_HideMatchInfo: Boolean;
    NoticesFilter_HideMatchWarning: Boolean;
    NoticesFilter_LevelToShowAsBigMessage: CUIConfig__ENoticeLevel;
    ScoreTable: Text;
    ScoreTableVisibility: CUIConfig__EVisibility;
    SmallScoreTable: Text;
    SmallScoreTableVisibility: CUIConfig__EVisibility;
    ScoreTableOnlyManialink: Boolean;
    AltMenuNoDefaultScores: Boolean;
    AltMenuNoCustomScores: Boolean;
    OverlayScoreSummary: Boolean;
    ScoreSummary_Player1: Ident;
    ScoreSummary_Points1: Integer;
    ScoreSummary_RoundPoints1: Integer;
    ScoreSummary_MatchPoints1: Integer;
    ScoreSummary_Gauge1: Real;
    ScoreSummary_Player2: Ident;
    ScoreSummary_Points2: Integer;
    ScoreSummary_RoundPoints2: Integer;
    ScoreSummary_MatchPoints2: Integer;
    ScoreSummary_Gauge2: Real;
    ScreenIn3dHideScoreSummary: Boolean;
    ScreenIn3dHideVersus: Boolean;
    DisplayControl_UseLiveCamera: Boolean;
    DisplayControl_UseEsportsProgrammation: Boolean;
    CountdownEndTime: Integer;
    UIStatus: CUIConfig__EUIStatus;
    LabelsVisibility: CUIConfig__EHudVisibility;
    LabelsVisibility_SkipMarkersOnly: Boolean;
    AlliesLabelsVisibility: CUIConfig__ELabelsVisibility;
    AlliesLabelsShowGauges: CUIConfig__EVisibility;
    AlliesLabelsShowNames: CUIConfig__EVisibility;
    /**
     * Values in range (0 - 250)
     */
    AlliesLabelsMaxCount: Integer;
    TeamLabelsVisibility: CUIConfig__ELabelsVisibility;
    TeamLabelsShowGauges: CUIConfig__EVisibility;
    TeamLabelsShowNames: CUIConfig__EVisibility;
    OpposingTeamLabelsVisibility: CUIConfig__ELabelsVisibility;
    OpposingTeamLabelsShowGauges: CUIConfig__EVisibility;
    OpposingTeamLabelsShowNames: CUIConfig__EVisibility;
    PlayerDisableFreeCam: Boolean;
    ForceSpectator: Boolean;
    SpectatorForceCameraType: Integer;
    SpectatorCamAutoLatitude: Real;
    SpectatorCamAutoLongitude: Real;
    SpectatorCamAutoRadius: Real;
    /**
     * When not in spectator mode, allow/forbid to change the camera to observe other players. (in Trackmania there's no 'Manual' mode.)
     */
    SpectatorObserverMode: CUIConfig__EObserverMode;
    Spectator_SetAutoTarget_Clear(): Void;
    Spectator_SetAutoTarget_All(): Void;
    Spectator_SetAutoTarget_User(
        User: CUser,
    ): Void;
    Spectator_SetForcedTarget_Clear(): Void;
    Spectator_SetForcedTarget_AllPlayers(): Void;
    Spectator_SetForcedTarget_AllMap(): Void;
    Spectator_SetForcedTarget_Entity(
        Entity: CEntity,
    ): Void;
    Spectator_SetForcedTarget_Landmark(
        Landmark: CMapLandmark,
    ): Void;
    /**
     * Only in local scripts, since ghosts are only known on the client.
     */
    Spectator_SetForcedTarget_Ghost(
        GhostInstanceId: Ident,
    ): Void;
    Spectator_SetForcedTarget_Clan(
        ClanNumber: Integer,
    ): Void;
    SendChat(
        Text: Text,
    ): Void;
    SendNotice(
        Text: Text,
        Level: CUIConfig__ENoticeLevel,
        Avatar: CUser,
        AvatarVariant: CUIConfig__EAvatarVariant,
        Sound: CUIConfig__EUISound,
        SoundVariant: Integer,
    ): Void;
    GetLayerManialinkAction(
        Layer: CUILayer,
    ): Text;
    ClearLayerManialinkAction(
        Layer: CUILayer,
    ): Void;
    AddMarker(
        Position: Vec3,
    ): CUIConfigMarker;
    AddMarker(
        Entity: CEntity,
    ): CUIConfigMarker;
    AddMarker(
        Landmark: CMapLandmark,
    ): CUIConfigMarker;
    AddMarker(
        GhostInstanceId: Ident,
    ): CUIConfigMarker;
    RemoveMarker(
        Marker: CUIConfigMarker,
    ): Void;
    ClearMarkers(): Void;
    QueueMessage(
        Duration: Integer,
        Priority: Integer,
        Level: CUIConfig__EMessageDisplay,
        Message: Text,
        Avatar: CUser,
        AvatarVariant: CUIConfig__EAvatarVariant,
        Sound: CUIConfig__EUISound,
        SoundVariant: Integer,
    ): Void;
    QueueMessage(
        Duration: Integer,
        Priority: Integer,
        Level: CUIConfig__EMessageDisplay,
        Message: Text,
        Sound: CUIConfig__EUISound,
        SoundVariant: Integer,
    ): Void;
    QueueMessage(
        Duration: Integer,
        Priority: Integer,
        Level: CUIConfig__EMessageDisplay,
        Message: Text,
    ): Void;
    ClearMessages(): Void;
}
export interface CEntity extends CNod {
    /**
     * Use this instead of Id when filling CUIConfig.MarkersXML
     */
    MarkerId: Ident;
}
export interface CPlayer extends CEntity {
    User: CUser;
    RequestedClan: Integer;
    RequestsSpectate: Boolean;
    /**
     * This player will only have Race interactions (CP, finishes...) with landmarks whose Order is equal to the selector. Set to -1 to interact with all landmarks.
     */
    LandmarkOrderSelector_Race: Integer;
}
export interface CScore extends CNod {
    User: CUser;
    IsRegisteredForLadderMatch: Boolean;
    LadderScore: Real;
    LadderRankSortValue: Integer;
    LadderMatchScoreValue: Real;
    LadderClan: Integer;
}
export interface CTeam extends CNod {
    Name: Text;
    ZonePath: Text;
    City: Text;
    EmblemUrl: Text;
    PresentationManialinkUrl: Text;
    ClubLinkUrl: Text;
    ColorPrimary: Vec3;
    ColorSecondary: Vec3;
    ColorUI: Vec3;
    ColorText: Text;
    ColorizedName: Text;
}
export interface CServerPluginEvent extends CBaseConstEvent {
    /**
     * Event type.
     */
    Type: CServerPluginEvent__EType;
    Client: CClient;
    ChatText: Text;
    ChatOption: CServerPluginEvent__EChatOption;
    ChatCommandType: Text;
    ChatCommandData: Array<Text>;
    ModeCallbackType: Text;
    ModeCallbackData: Array<Text>;
    EndMatchScores: Array<CScore>;
    EndMatchRanks: Array<Integer>;
}
export interface CUIConfigMgr extends CNod {
    ResetAll(): Void;
    UIAll: CUIConfig;
    UI: Array<CUIConfig>;
    GetUI(
        Player: CPlayer,
    ): CUIConfig;
    GetUI(
        User: CUser,
    ): CUIConfig;
    GetUI(
        Client: CClient,
    ): CUIConfig;
    UILayers: Array<CUILayer>;
    UILayerCreate(): CUILayer;
    UILayerDestroy(
        Layer: CUILayer,
    ): Void;
    UILayerDestroyAll(): Void;
    UIReplayLayers: Array<CUILayer>;
    UISequenceMaxDuration: Integer;
    HoldLoadingScreen: Boolean;
    PendingEvents: Array<CUIConfigEvent>;
}
export interface CServerAdmin extends CNod {
    /**
     * ServerInfo
     */
    ServerInfo: CServerInfo;
    AutoTeamBalance(): Void;
    Kick(
        User: CUser,
        Reason: Text,
    ): Boolean;
    Kick(
        Client: CClient,
        Reason: Text,
    ): Boolean;
    Ban(
        User: CUser,
        Reason: Text,
    ): Boolean;
    Ban(
        Client: CClient,
        Reason: Text,
    ): Boolean;
    ForceSpectator(
        User: CUser,
        SpecMode: CServerAdmin__ESpecMode,
    ): Boolean;
    ForceSpectator(
        Client: CClient,
        SpecMode: CServerAdmin__ESpecMode,
    ): Boolean;
    ForcePlayerRequestedTeam(
        User: CUser,
        Team: Integer,
    ): Boolean;
    /**
     * Team is 1 or 2.
     */
    ForcePlayerRequestedTeam(
        Client: CClient,
        Team: Integer,
    ): Boolean;
    /**
     * Disable Team change UI on the clients.
     */
    IsDisableChangeTeams: Boolean;
    IsDisableProfileSkins: Boolean;
    /**
     * Connect a fake player (to help with debugging game modes)
     */
    ConnectFakePlayer(): Text;
    DisconnectFakePlayer(
        Login: Text,
    ): Void;
    SetLobbyInfo(
        IsLobby: Boolean,
        LobbyPlayerCount: Integer,
        LobbyMaxPlayerCount: Integer,
        LobbyPlayersLevel: Real,
    ): Void;
    SendToServerAfterMatch(
        ServerUrl: Text,
    ): Void;
    CustomizeQuitDialog(
        ManialinkPage: Text,
        SendToServerUrl: Text,
        ProposeAddToFavorites: Boolean,
        ForceDelay: Integer,
    ): Void;
    /**
     * Always use NullId as UserId.
     */
    Authentication_GetToken(
        UserId: Ident,
        AppLogin: Text,
    ): Void;
    Authentication_GetTokenResponseReceived: Boolean;
    Authentication_ErrorCode: Integer;
    Authentication_Token: Text;
    SetViewerCount(
        ViewerCount: Integer,
    ): Void;
    PlayerRestrictions: Text;
}
export interface CXmlRpc extends CNod {
    PendingEvents: Array<CXmlRpcEvent>;
    SendCallback(
        Param1: Text,
        Param2: Text,
    ): Void;
    SendCallbackArray(
        Type: Text,
        Data: Array<Text>,
    ): Void;
    SendCallback_BeginRound(): Void;
    SendCallback_EndRound(): Void;
}
export interface CTaskResult extends CNod {
    /**
     * Returns a boolean indicating if the task is still processing.
     */
    IsProcessing: Boolean;
    /**
     * Returns a boolean indicating if the task has succeeded.
     */
    HasSucceeded: Boolean;
    /**
     * Returns a boolean indicating if the task has failed or has been canceled.
     */
    HasFailed: Boolean;
    /**
     * Returns a boolean indicating if the task has been canceled.
     */
    IsCanceled: Boolean;
    /**
     * Returns the type of the error if the task has failed.
     */
    ErrorType: Text;
    /**
     * Returns the code of the error if the task has failed.
     */
    ErrorCode: Text;
    /**
     * Returns the description of the error if the task has failed.
     */
    ErrorDescription: Text;
    Cancel(): Void;
}
export interface CGhost extends CNod {
    /**
     * Ghost id
     */
    Id: Ident;
    /**
     * Result associated to this ghost (score/time/respawncount).
     */
    Result: CTmRaceResultNod;
    /**
     * Nickname of the player.
     */
    Nickname: Text;
    /**
     * Trigram of the player.
     */
    Trigram: Text;
    CountryPath: Text;
    SetProfileInfoFromUser(
        User: CUser,
    ): Void;
}
export interface CTaskResult_Ghost extends CTaskResult {
    /**
     * Ghost contained by this result.
     */
    Ghost: CGhost;
}
export interface CSkinInfo extends CNod {
    Name: Text;
    Type: Text;
    Url: Text;
}
export interface CSmPlayer extends CPlayer {
    Score: CSmScore;
    SpawnStatus: CSmPlayer__ESpawnStatus;
    StartTime: Integer;
    EndTime: Integer;
    RaceWaypointTimes: Array<Integer>;
    /**
     * Equals CurrentLapWaypointTimes when not empty. If it is empty (i.e. before the 1st CP of a new lap), equals PreviousLapWaypointTimes.
     */
    LapWaypointTimes: Array<Integer>;
    CurrentLapWaypointTimes: Array<Integer>;
    PreviousLapWaypointTimes: Array<Integer>;
    CurrentLapNumber: Integer;
    CurrentRaceTime: Integer;
    CurrentLapTime: Integer;
    /**
     * Values in range (0.000000-10.000000)
     */
    AmmoGain: Real;
    ActionWheelSelectedSlotIndex: Integer;
    Armor: Integer;
    ArmorMax: Integer;
    ArmorGain: Integer;
    ArmorReplenishGain: Integer;
    /**
     * Values in range (0.100000-10.000000)
     */
    ArmorPower: Real;
    Stamina: Integer;
    StaminaMaxValue: Integer;
    /**
     * Values in range (0.100000-3.000000)
     */
    StaminaMax: Real;
    /**
     * Values in range (0.000000-1.000000)
     */
    StaminaGain: Real;
    /**
     * Values in range (0.100000-1.000000)
     */
    StaminaPower: Real;
    /**
     * Values in range (0.100000-1.000000)
     */
    SpeedPower: Real;
    /**
     * Values in range (0.100000-1.000000)
     */
    JumpPower: Real;
    AllowWallJump: Boolean;
    AllowProgressiveJump: Boolean;
    UseAlternateWeaponVisual: Boolean;
    IsHighlighted: Boolean;
    /**
     * Values in range (0.000000-1.000000)
     */
    EnergyLevel: Real;
    ForceColor: Vec3;
    /**
     * 5 ascii chars (ex: '01TMN') or empty for default value
     */
    Dossard: Text;
    Dossard_Number: Text;
    Dossard_Trigram: Text;
    Dossard_Color: Vec3;
    /**
     * Values in range (0.000000-1.000000)
     */
    GetLinearHue: Real;
    ForceLinearHue: Real;
    ForceModelId: Ident;
    HasShield: Boolean;
    IsInVehicle: Boolean;
    IsStuck: Boolean;
    /**
     * Values in range (0.000000-500.000000)
     */
    ThrowSpeed: Real;
    CurrentClan: Integer;
    IdleDuration: Integer;
    IsEntityStateAvailable: Boolean;
    Position: Vec3;
    AimYaw: Real;
    AimPitch: Real;
    AimRoll: Real;
    AimDirection: Vec3;
    UpDirection: Vec3;
    LeftDirection: Vec3;
    Velocity: Vec3;
    Speed: Real;
    IsUnderground: Boolean;
    IsTouchingGround: Boolean;
    IsInAir: Boolean;
    IsInWater: Boolean;
    IsInOffZone: Boolean;
    IsOnTech: Boolean;
    IsOnTechGround: Boolean;
    IsOnTechLaser: Boolean;
    IsOnTechArrow: Boolean;
    IsOnTechNucleus: Boolean;
    IsOnTechArmor: Boolean;
    IsOnTechSafeZone: Boolean;
    IsOnTechTeleport: Boolean;
    IsOnTechNoWeapon: Boolean;
    IsPowerJumpActivable: Boolean;
    IsTeleportActivable: Boolean;
    IsAttractorActivable: Boolean;
    NbActiveAttractors: Integer;
    IsCapturing: Boolean;
    CapturedLandmark: CSmMapLandmark;
    Objects: Array<CSmObject>;
    Vehicle: CModeVehicle;
    IsFakePlayer: Boolean;
    IsBot: Boolean;
    /**
     * Use a low-fi extrapolation to display the player. This extrapolation mode does not take interactions into account. Only use it when this player does not interact with other player (e.g. TM TimeAttack, SM Obstacle).
     */
    UseCrudeExtrapolation: Boolean;
    TrustClientSimu: Boolean;
    Driver: CSmPlayerDriver;
    /**
     * Values in range (0.000000-1.000000)
     */
    AccelCoef: Real;
    /**
     * Values in range (0.000000-1.000000)
     */
    ControlCoef: Real;
    /**
     * Values in range (0.000000-1.000000)
     */
    GravityCoef: Real;
    /**
     * Values in range (0.000000-1.000000)
     */
    AdherenceCoef: Real;
    Upwardness: Real;
    Distance: Real;
    DisplaySpeed: Integer;
    InputSteer: Real;
    InputGasPedal: Real;
    InputIsBraking: Boolean;
    EngineRpm: Real;
    EngineCurGear: Integer;
    EngineTurboRatio: Real;
    WheelsContactCount: Integer;
    WheelsSkiddingCount: Integer;
    FlyingDuration: Integer;
    SkiddingDuration: Integer;
    SkiddingDistance: Real;
    FlyingDistance: Real;
    HandicapNoGasDuration: Integer;
    HandicapForceGasDuration: Integer;
    HandicapNoBrakesDuration: Integer;
    HandicapNoSteeringDuration: Integer;
    HandicapNoGripDuration: Integer;
}
export interface CBaseEvent extends CBaseConstEvent {
    HasBeenPassed: Boolean;
    HasBeenDiscarded: Boolean;
}
export interface CSmModeEvent extends CBaseEvent {
    /**
     * Event type
     */
    Type: CSmModeEvent__EType;
    Player: CSmPlayer;
    Damage: Integer;
    VictimShield: Integer;
    VictimEntity: CEntity;
    ShooterPoints: Integer;
    ShooterEntity: CEntity;
    ShooterClan: Integer;
    Height: Real;
    UserData: Integer;
    ItemPosition: Vec3;
    MissDist: Real;
    WeaponNum: Integer;
    ShooterUsedAction: Boolean;
    ShooterWeaponNum: Integer;
    ShooterActionSlot: CSmModeEvent__EActionSlot;
    ShooterActionId: Text;
    VictimUsedAction: Boolean;
    VictimWeaponNum: Integer;
    VictimActionSlot: CSmModeEvent__EActionSlot;
    VictimActionId: Text;
    ActionSlot: CSmModeEvent__EActionSlot;
    ActionInput: CSmModeEvent__EActionInput;
    ActionId: Text;
    Param1: Text;
    Param2: Array<Text>;
    Object: CSmObject;
    WaypointTime: Integer;
    WaypointLapTime: Integer;
    IsFinish: Boolean;
    IsNewLap: Boolean;
    Landmark: CSmMapLandmark;
    User: CUser;
    PlayerWasSpawned: Boolean;
    PlayerWasDisconnected: Boolean;
    PlayerWasInLadderMatch: Boolean;
    PlayerLastPosition: Vec3;
    PlayerLastAimDirection: Vec3;
    GiveUp: Boolean;
    RegressRespawn: Boolean;
    CommandName: Text;
    CommandValueBoolean: Boolean;
    CommandValueInteger: Integer;
    CommandValueReal: Real;
    CommandValueText: Text;
    CommandValueVec2: Vec2;
    CommandValueVec3: Vec3;
    CommandValueInt2: Int2;
    CommandValueInt3: Int3;
    ActionChange: Integer;
}
export interface CSmMapBase extends CNod {
    Clan: Integer;
    IsActive: Boolean;
    NumberOfCollectors: Integer;
}
export interface CMapLandmark extends CNod {
    /**
     * Use this instead of Id when filling CUIConfig.MarkersXML
     */
    MarkerId: Ident;
    Tag: Text;
    Order: Integer;
    Position: Vec3;
    Sector: CMapSector;
    Waypoint: CMapWaypoint;
    PlayerSpawn: CMapSpawn;
    BotPath: CMapBotPath;
    BotSpawn: CMapBotSpawn;
    ObjectAnchor: CMapObjectAnchor;
}
export interface CSmMapLandmark extends CMapLandmark {
    Base: CSmMapBase;
    Gate: CSmMapGate;
    Gauge: CSmMapGauge;
}
export interface CSmScore extends CScore {
    TeamNum: Integer;
    Points: Integer;
    RoundPoints: Integer;
    NbRespawnsRequested: Integer;
    NbEliminationsInflicted: Integer;
    NbEliminationsTaken: Integer;
    DamageInflicted: Integer;
    DamageTaken: Integer;
    BestRaceTimes: Array<Integer>;
    PrevRaceTimes: Array<Integer>;
    BestLapTimes: Array<Integer>;
    PrevLapTimes: Array<Integer>;
}
export interface CMapSpawn extends CNod {
}
export interface CModeTurret extends CEntity {
    Armor: Integer;
    ArmorMax: Integer;
    Owner: CPlayer;
}
export interface CModeVehicle extends CEntity {
    Armor: Integer;
    ArmorMax: Integer;
    Position: Vec3;
    Pitch: Real;
    Roll: Real;
    Left: Vec3;
    Up: Vec3;
    Dir: Vec3;
    Velocity: Vec3;
    Clan: Integer;
    AccelCoef: Real;
    AccelInput: Real;
    SetEngineActivated(
        IsActivated: Boolean,
    ): Void;
}
export interface CMapBotPath extends CNod {
    Clan: Integer;
    Path: Array<Vec3>;
    IsFlying: Boolean;
    BotModelId: Ident;
}
export interface CMapBotSpawn extends CNod {
    IsFlying: Boolean;
    BotModelId: Ident;
}
export interface CMapWaypoint extends CNod {
    IsFinish: Boolean;
    IsMultiLap: Boolean;
}
export interface CSmObject extends CEntity {
    Status: CSmObject__EStatus;
    ModelId: Ident;
    SetAnchor(
        ObjectAnchor: CMapObjectAnchor,
    ): Void;
    SetPlayer(
        Player: CSmPlayer,
    ): Void;
    SetPosition(
        Position: Vec3,
    ): Void;
    SetPositionAndVel(
        Position: Vec3,
        Vel: Vec3,
    ): Void;
    SetUnspawned(): Void;
    /**
     * Player holding the object, or Null if the object isn't held by a player.
     */
    Player: CSmPlayer;
    AnchorLandmark: CSmMapLandmark;
    Position: Vec3;
    Vel: Vec3;
    MachineState: Integer;
    Throwable: Boolean;
    ThrowLatestPlayerId: Ident;
}
export interface CGhostManager extends CNod {
    Ghost_Add(
        Ghost: CGhost,
    ): Ident;
    Ghost_Add(
        Ghost: CGhost,
        IsGhostLayer: Boolean,
    ): Ident;
    Ghost_Add(
        Ghost: CGhost,
        IsGhostLayer: Boolean,
        TimeOffset: Integer,
    ): Ident;
    Ghost_AddWaypointSynced(
        Ghost: CGhost,
        IsGhostLayer: Boolean,
    ): Ident;
    Ghost_IsReplayOver(
        GhostInstanceId: Ident,
    ): Boolean;
    Ghost_IsVisible(
        GhostInstanceId: Ident,
    ): Boolean;
    Ghost_Remove(
        GhostInstanceId: Ident,
    ): Void;
    Ghost_RemoveAll(): Void;
    /**
     * 5 ascii chars (ex: '01TMN') or empty for default value
     */
    Ghost_SetDossard(
        GhostInstanceId: Ident,
        Dossard: Text,
    ): Void;
    /**
     * 5 ascii chars (ex: '01TMN') or empty for default value + color
     */
    Ghost_SetDossard(
        GhostInstanceId: Ident,
        Dossard: Text,
        Color: Vec3,
    ): Void;
}
export interface CSmActionEvent extends CBaseConstEvent {
    /**
     * Type.
     */
    Type: CSmActionEvent__EType;
    ProjectileModelId: Ident;
    ProjectileStartDate: Integer;
    Damage: Integer;
    ContextId: Integer;
    Position: Vec3;
    Direction: Vec3;
    Normal: Vec3;
    Victim: CEntity;
    Shield: Integer;
    Input: CSmActionEvent__EInputChange;
    ScrollDelta: Integer;
}
export interface CGameUserVoiceChat extends CNod {
    MuteSetting: CGameUserVoiceChat__EMuteSetting;
    IsLocal: Boolean;
    IsMuted: Boolean;
    MuteChangePending: Boolean;
    IsSpeaking: Boolean;
    IsConnected: Boolean;
    Supported: Boolean;
    MatchingPlayerInfo: CUser;
}
/**
 * Documentation for class SConstStringInt
 */
export interface SConstStringInt {
}
/**
 * Documentation for class SConstString
 */
export interface SConstString {
}
export namespace NSystemConfig {
    export enum EVoiceDetectionMode {
    }
}
export interface CAudioSettings extends CNod {
    DirtyCounter: Integer;
    Devices: Array<Text>;
    Device_Current: Text;
    Device_NextApply: Text;
    VoiceChat_Devices_DirtyCounter: Integer;
    VoiceChat_Devices_In: Array<Text>;
    VoiceChat_Devices_Out: Array<Text>;
    VoiceChat_Device_In_Current: Text;
    VoiceChat_Device_Out_Current: Text;
    VoiceChat_Device_In_NextApply: Text;
    VoiceChat_Device_Out_NextApply: Text;
    VoiceChat_SpeakerVolume: Real;
    VoiceChat_VoiceDetection_Mode: NSystemConfig.EVoiceDetectionMode;
    /**
     * VoiceChat_VoiceDetection_Sensitivity is a value between 0 and 1.
     */
    VoiceChat_VoiceDetection_Sensitivity: Real;
}
export interface CModuleMenuComponent extends CNod {
    ComponentLayer: CUILayer;
    Hide(): Void;
    Show(): Void;
}
export interface CModulePlayground extends CNod {
    Hide(): Void;
    Hide(
        UIConfig: CUIConfig,
    ): Void;
    Show(): Void;
    Show(
        UIConfig: CUIConfig,
    ): Void;
    IsVisible(
        UIConfig: CUIConfig,
    ): Boolean;
}
export interface CModuleMenuPage extends CNod {
    Name: Text;
    Components: Array<CModuleMenuComponent>;
}
export interface CEditorBase extends CNod {
}
export interface CEditorModule extends CEditorBase {
    NewModule(
        ModuleType: CEditorModule__EModuleType,
    ): Void;
    OpenModule(
        Path: Text,
    ): Void;
    Save(): Void;
    SaveAs(
        Path: Text,
    ): Void;
    SaveCopyAs(
        Path: Text,
    ): Void;
    ForceExit(): Void;
    SetPreviewBackground(
        Url: Text,
    ): Void;
    ReloadPreview(): Void;
    EditedMenu: CModuleMenuModel;
    EditedMenuPage: CModuleMenuPageModel;
    EditedPlaygroundHud: CModulePlaygroundHudModel;
    EditedPlaygroundHud_SetPreviewContext(
        ContextId: Ident,
    ): Void;
    FileBrowser_Open(): Void;
    FileBrowser_Save(): Void;
    FileBrowser_IsRunning: Boolean;
    FileBrowser_FilePath: Text;
    PendingEvents: Array<CEditorPluginModuleEvent>;
    IsPreviewMode: Boolean;
}
export interface CEditorAsset extends CEditorBase {
}
export interface CEditorMesh extends CEditorAsset {
    GoToMaterialEditor: Boolean;
    IsCreateMaterial: Boolean;
    Layers_GetCount(): Integer;
    Layers_GetLayerIdFromIndex(
        LayerIndex: Integer,
    ): Ident;
    Layers_GetLayerNameFromIndex(
        LayerIndex: Integer,
    ): Text;
    Layers_GetLayerTypeFromIndex(
        LayerIndex: Integer,
    ): CEditorMesh__ELayerType;
    Layers_GetLayerGeneratableFromIndex(
        LayerIndex: Integer,
    ): Boolean;
    Layers_SetLayerGeneratableFromIndex(
        LayerIndex: Integer,
        LayerGeneratability: Boolean,
    ): Void;
    Layers_AddLayer(
        LayerType: CEditorMesh__ELayerType,
    ): Void;
    Layers_GetLayerIdSelected(): Ident;
    Layers_SetLayerIdSelected(
        LayerId: Ident,
    ): Void;
    Layers_GetLayerSelectedType(): CEditorMesh__ELayerType;
    Layers_GetLayerSelectedIndex(): Integer;
    Layers_GetEditedLayerType(): CEditorMesh__ELayerType;
    Layers_GetLayerSelectedName(): Text;
    Layers_EditMask(
        LayerIndex: Integer,
    ): Void;
    Layers_EditMaskValidate(
        LayerIndex: Integer,
    ): Void;
    Layers_MoveSelectedLayerUp(): Void;
    Layers_MoveSelectedLayerDown(): Void;
    Layers_EditSelectedLayer(
        RegenerateSolid: Boolean,
    ): Void;
    Layers_CloseEditSelectedLayer(): Void;
    Layers_DeleteSelectedLayer(): Void;
    Transitions_GetCount(): Integer;
    Transitions_AddTransition(
        TransitionName: Text,
        TransitionPosition: Integer,
        TransitionSize: Real,
    ): Void;
    Transitions_DeleteCurrentTransition(): Void;
    Transitions_GetTransitionSelectedIndex(): Integer;
    Transitions_SetTransitionSelectedIndex(
        TransitionIndex: Integer,
    ): Void;
    Transitions_GetTransitionCurrentPage(): Integer;
    Transitions_SetTransitionCurrentPage(
        TransitionCurrentPage: Integer,
    ): Void;
    Transitions_GetTransitionNameFromIndex(
        TransitionIndex: Integer,
    ): Text;
    Transitions_SetTransitionNameFromIndex(
        TransitionIndex: Integer,
        TransitionName: Real,
    ): Void;
    Transitions_GetTransitionVisibilityFromIndex(
        TransitionIndex: Integer,
    ): Boolean;
    Transitions_SetTransitionVisibilityFromIndex(
        TransitionIndex: Integer,
        TransitionVisibility: Boolean,
    ): Void;
    Transitions_GetTransitionSizeFromIndex(
        TransitionIndex: Integer,
    ): Real;
    Transitions_SetTransitionSizeFromIndex(
        TransitionIndex: Integer,
        TransitionSize: Real,
    ): Void;
    Transitions_GetTransitionPositionFromIndex(
        TransitionIndex: Integer,
    ): Integer;
    Transitions_SetTransitionPositionFromIndex(
        TransitionIndex: Integer,
        TransitionPosition: Integer,
    ): Void;
    IsEditingLayer: Boolean;
    SubdivideSmooth_NbSteps: Integer;
    LayerValueAxisX: Real;
    LayerValueAxisY: Real;
    LayerValueAxisZ: Real;
    LayerIndep: Boolean;
    LayerValueParam1: Real;
    LayerValueParam2: Real;
    LayerValueParam3: Real;
    LayerValueParam4: Real;
    LayerIndexAxisX: Boolean;
    LayerIndexAxisY: Boolean;
    LayerIndexAxisZ: Boolean;
    Layer_IsVisible: Boolean;
    Layer_IsCollidable: Boolean;
    LayerName: Text;
    LayerGeneratable: Boolean;
    AddTransitionInProgress: Boolean;
    NewTransitionName: Text;
    NewTransitionPosition: Integer;
    NewTransitionSize: Real;
    RotateAxis: Integer;
    Tmp_UseParts: Boolean;
    IsDebug: Boolean;
    CameraEatingInputsScript: Boolean;
    VertexCount: Integer;
    EdgeCount: Integer;
    FaceCount: Integer;
    EditionBox_SetStep(
        Step: Real,
    ): Void;
    EditionBox_IsPlaneOriented: Boolean;
    Scale: Real;
    Step: Real;
    Size: Real;
    RotationStep: Integer;
    RotationValue: Real;
    ScalingStep: Real;
    ScalingRatio: Real;
    DisplayVertices: Boolean;
    DisplayFaces: Boolean;
    DisplayJoints: Boolean;
    DisplayEdges: CEditorMesh__EEdgesDisplay;
    EditedMesh_Clear(): Void;
    EditedMesh_Simplify(): Void;
    EditedMesh_SimplifySelection(): Void;
    EditedMesh_Lod(
        FacesRatio: Real,
    ): Void;
    UVUnwrap(
        SetHandle: Ident,
        ETexCoordLayer: CEditorMesh__ETexCoordLayer,
    ): Void;
    Undo(): Void;
    Redo(): Void;
    SwitchPlane(): Void;
    GridSnap_SetActive(
        IsActive: Boolean,
    ): Void;
    GridSnap_IsActive: Boolean;
    PickInfo_GetNormal(): Vec3;
    PickInfo_GetPosition(): Vec3;
    PickInfo_GetAnchorId(): Ident;
    PickInfo_GetEdgeLength(): Real;
    PickInfo_GetNextVertexPosition(): Vec3;
    PickInfo_GetMaterial(): Ident;
    PickInfo_GetError(): Text;
    Part_SetAnchorPos(
        Position: Vec3,
    ): Void;
    Part_SetIsJoint(
        IsJoint: Boolean,
    ): Void;
    Part_ClearAnchor(): Void;
    Joint_Add(
        Position: Vec3,
    ): Void;
    Joint_Link(
        IdChild: Ident,
        IdParent: Ident,
    ): Void;
    Anchor_Remove(
        Id: Ident,
    ): Void;
    IsUsingPhysicMatLib: Boolean;
    MaterialGameplayIdNumber: Integer;
    MaterialsUpdateId: Integer;
    MaterialIds: Array<Ident>;
    MaterialPhysicsIds: Array<Ident>;
    MaterialDynaIds: Array<Ident>;
    MaterialNames: Array<Text>;
    MaterialPhysicsNames: Array<Text>;
    MaterialPhysics_GameplayRemap: Array<Integer>;
    MaterialDynaNames: Array<Text>;
    MaterialLastUsedColors: Array<Vec3>;
    MaterialBaseColors: Array<Vec3>;
    CurrentColorForSpecialMaterials: Vec3;
    Material_GetMaterialIdSelected(): Ident;
    Material_SetMaterialIdSelected(
        MaterialEditorId: Ident,
    ): Void;
    MaterialDyna_GetMaterialIdSelected(): Ident;
    MaterialDyna_SetMaterialIdSelected(
        DynaMaterialType: Ident,
    ): Void;
    Material_GetSubTexIndexSelected(): Integer;
    Material_MaterialLibGetCount(): Integer;
    Material_SetDefault(
        MaterialId: Ident,
    ): Void;
    Material_GetDefault(): Ident;
    MaterialPhysic_GetDefault(): Ident;
    MaterialPhysic_GetIndex(): Integer;
    MaterialPhysic_GetGameplayId(
        MaterialId: Ident,
    ): Integer;
    MaterialPhysic_GetNextBitmap(): CImage;
    MaterialDyna_GetDefault(): Ident;
    MaterialDyna_SetDefault(
        MaterialId: Ident,
    ): Void;
    Material_GetBitmapBase(
        MaterialId: Ident,
    ): CImage;
    Material_GetBitmap(
        MaterialId: Ident,
    ): CImage;
    MaterialDyna_GetBitmap(
        MaterialId: Ident,
    ): CImage;
    Material_IsSpecialColored(
        MaterialId: Ident,
    ): Boolean;
    Material_MatchesCriterion(
        MaterialId: Ident,
        ResultSetHandle: CEditorMesh__EMaterialFilterCriterion,
    ): Boolean;
    Material_SetFilter(
        Criterion: CEditorMesh__EMaterialFilterCriterion,
        FilterKind: CEditorMesh__EFilterKind,
    ): Void;
    Material_GetFilter(
        Criterion: CEditorMesh__EMaterialFilterCriterion,
    ): CEditorMesh__EFilterKind;
    Material_ClearFilters(): Void;
    Material_UVEditor_SetIsRotation(
        IsRotation: Boolean,
    ): Void;
    Material_UVEditor_SetIsScale(
        IsScale: Boolean,
    ): Void;
    Material_UVEditor_SetIsScale1D(
        IsScale: Boolean,
    ): Void;
    Material_UVEditor_Open(
        MaterialId: Ident,
        LocationQuad: CMlQuad,
    ): Void;
    Material_UVEditor_Close(): Void;
    Material_UVEditor_IsRunning(): Boolean;
    Material_UVEditor_SetMode(
        Mode: CEditorMesh__EUVEditorMode,
    ): Void;
    Material_UVEditor_GetMode(): CEditorMesh__EUVEditorMode;
    Material_UVEditor_SetProjectionType(
        ProjectionType: CEditorMesh__EUVEditorProjectionType,
    ): Void;
    Material_IsGameMaterial(): Boolean;
    Material_IsCustomLinkFull(
        MaterialId: Ident,
    ): Boolean;
    Material_UVEditor_Apply(): Void;
    Material_CopyMaterial(
        SetHandle: Ident,
    ): Void;
    Material_PasteMaterial(
        SetHandle: Ident,
    ): Void;
    Material_Atlas_SelectedSubTexIndex: Integer;
    CurrentInteraction: CEditorMesh__EInteraction;
    Interaction_Close(): Void;
    Interaction_SetPreview(
        SetToPreview: Ident,
    ): Void;
    CreationElemsCount: Integer;
    Interaction_StartCreation(
        CreationSetHandle: Ident,
        ElemType: CEditorMesh__EElemType,
        SetToPickFromHandle: Ident,
    ): Boolean;
    Interaction_Creation_GetElems(
        ResultSetHandle: Ident,
    ): Void;
    Interaction_Creation_ClearParams(): Void;
    Interaction_Creation_SetEdgesConstraint(
        EdgesConstraint: CEditorMesh__EEdgesConstraint,
    ): Void;
    Interaction_Creation_SetAutoMerge(
        AutoMerge: Boolean,
    ): Void;
    Interaction_StartPaste(): Boolean;
    Interaction_StartBlocTransformation(
        TransformationSetHandle: Ident,
    ): Boolean;
    Interaction_StartCurve2D(
        BordersSetHandle: Ident,
    ): Boolean;
    Interaction_CloseCurve2D(
        CanDoCurve2D: Boolean,
    ): Void;
    Interaction_StartPick(
        ElemType: CEditorMesh__EElemType,
        SetToPickFrom: Ident,
    ): Boolean;
    Interaction_StartPickJoint(): Boolean;
    Interaction_StartVoxelPickDrag_Base(
        ElemType: CEditorMesh__EElemType,
    ): Boolean;
    Interaction_StartVoxelPickDrag_Creation(): Boolean;
    Interaction_StartVoxelPickDrag_Delete(): Boolean;
    Interaction_StartVoxelPickDrag_Select(
        SelectionSetHandle: Ident,
    ): Boolean;
    Interaction_CloseVoxelPickDrag_Select(): Void;
    Interaction_StartVoxelPickDrag_Pick(): Boolean;
    Interaction_CloseVoxelPickDrag_Pick(): Void;
    Interaction_StartVoxelPickDrag_SelectTranslation(): Boolean;
    Interaction_StartVoxelPickDrag_SelectRotation(): Boolean;
    Interaction_StartVoxelPickDrag_Paste(): Boolean;
    CutVoxels(): Void;
    CopyVoxels(): Void;
    Interaction_StartMerge(
        MergeSetHandle: Ident,
    ): Boolean;
    Interaction_StartMirror(
        SetHandle: Ident,
    ): Boolean;
    Interaction_Selection_ClearParams(): Void;
    Interaction_Selection_SetUseParts(
        UseParts: Boolean,
    ): Void;
    Interaction_Selection_SetCanEnterLeaf(
        CanEnterLeaf: Boolean,
    ): Void;
    Interaction_StartSelection(
        SelectionSetHandle: Ident,
        ElemType: CEditorMesh__EElemType,
        SelectionSetToPickFrom: Ident,
        IsFromALayer: Boolean,
        AllowDoubleClick: Boolean,
    ): Boolean;
    Interaction_CloseSelection(): Void;
    Interaction_StartTranslation(
        TranslationSetHandle: Ident,
    ): Boolean;
    Interaction_StartPickTranslation(
        TranslationSetHandle: Ident,
    ): Boolean;
    Interaction_StartRotation(
        RotationSetHandle: Ident,
    ): Boolean;
    Interaction_StartPickRotation(
        RotationSetHandle: Ident,
    ): Boolean;
    Interaction_Rotation_SetStep(
        RotationStep: Real,
    ): Void;
    Interaction_StartPickScale(
        ScalingSetHandle: Ident,
    ): Boolean;
    Interaction_Scale_SetStep(
        ScalingStep: Real,
    ): Void;
    Interaction_StartSplit(): Boolean;
    Display_HighlightSet(
        SetHandle: Ident,
    ): Void;
    Display_ClearHighlighting(): Void;
    Display_HideElemsByDistance_IsActive: Boolean;
    Display_HideElemsByDistance_Distance: Integer;
    Display_HideElemsByDistance_Opacity: Real;
    Display_HideElemsByDistance_Start(
        SetHandle: Ident,
    ): Void;
    Display_HideElemsByDistance_Stop(): Void;
    Display_HideMap(): Void;
    Display_ShowMap(): Void;
    MergeAllSuperposedElements(
        SetHandle: Ident,
    ): Void;
    SelectionSet: Ident;
    Selection_Undo(): Void;
    Selection_Redo(): Void;
    Selection_Invert(): Void;
    Selection_SelectAllByMaterial(): Void;
    SetOfElements_Create(): Ident;
    SetOfElements_CopyFrom(
        DestinationSet: Ident,
        SourceSet: Ident,
    ): Void;
    SetOfElements_Append(
        DestinationSet: Ident,
        SourceSet: Ident,
    ): Void;
    SetOfElements_Destroy(
        SetHandle: Ident,
    ): Void;
    SetOfElements_Empty(
        SetHandle: Ident,
    ): Void;
    SetOfElements_SetAllElements(
        SetHandle: Ident,
    ): Void;
    SetOfElements_SetAllFaces(
        SetHandle: Ident,
    ): Void;
    SetOfElements_DeleteElements(
        SetHandle: Ident,
    ): Void;
    SetOfElements_DeleteElements(
        SetHandle: Ident,
        Spread: Boolean,
    ): Void;
    SetOfElements_HasHorizontalFaces(
        SetHandle: Ident,
    ): Boolean;
    SetOfElements_HasVerticalFaces(
        SetHandle: Ident,
    ): Boolean;
    SetOfElements_GetElemsCount(
        SetHandle: Ident,
    ): Integer;
    SetOfElements_GetVerticesCount(
        SetHandle: Ident,
    ): Integer;
    SetOfElements_GetEdgesCount(
        SetHandle: Ident,
    ): Integer;
    SetOfElements_GetFacesCount(
        SetHandle: Ident,
    ): Integer;
    ExtendSelectedSet(
        SetHandle: Ident,
    ): Void;
    GetBordersSet(
        SetHandle: Ident,
        SetBordersHandle: Ident,
    ): Boolean;
    GetBordersVertexs(
        SetHandle: Ident,
        SetVertexHandle: Ident,
    ): Void;
    SelectionSet_SelectAll(): Void;
    Curve2DPolygon(
        FourVertexSetHandle: Ident,
        Sethandle: Ident,
        SubTexIndex: Integer,
    ): Void;
    Preview_Clear(): Void;
    VoxelSpace_SetVec3(
        Pos: Vec3,
    ): Void;
    VoxelSpace_GetVoxelsCount(): Integer;
    VoxelSpace_SelectAll(): Void;
    VoxelSpace_DeleteOneVoxel(): Void;
    VoxelSpace_DeleteSelection(): Void;
    VoxelSpace_ApplyMaterialToVoxel(): Void;
    VoxelSpace_GenerateMesh(): Void;
    VoxelSpaceCenter: Vec3;
    VoxelSpaceAngle: Vec3;
    VoxelSpaceStep: Real;
    VoxelSpaceIsInteractive: Boolean;
    SetOfElements_ProjectOnPlane(
        SetHandle: Ident,
    ): Void;
    SetOfElements_ProjectOnGround(
        SetHandle: Ident,
        Height: Real,
    ): Void;
    SetOfElements_SplitEdgeWithVertex(
        SetHandle: Ident,
    ): Void;
    SetOfElements_CollapseEdgeWithVertex(
        SetHandle: Ident,
    ): Void;
    SetOfElements_Subdivide(
        SetHandle: Ident,
    ): Void;
    SetOfElements_Subdivide_Interpolation(
        SetHandle: Ident,
    ): Void;
    SetOfVertices_DrawCircle(
        InputSetHandle: Ident,
        ResultSetHandle: Ident,
    ): Void;
    SetOfVertices_DrawDisc(
        InputSetHandle: Ident,
        ResultSetHandle: Ident,
    ): Void;
    SetOfVertices_DrawCircle(
        CenterSetHandle: Ident,
        PointOnCircle: Vec3,
        ResultSetHandle: Ident,
    ): Void;
    SetOfVertices_DrawIcosahedron(
        InputSetHandle: Ident,
        ResultSetHandle: Ident,
    ): Void;
    SetOfVertices_DrawIcosahedron(
        CenterSetHandle: Ident,
        PointOnCircle: Vec3,
        ResultSetHandle: Ident,
    ): Void;
    SetOfVertices_DrawIcosahedricSphere(
        InputSetHandle: Ident,
        ResultSetHandle: Ident,
    ): Void;
    SetOfVertices_DrawPoly(
        InputSetHandle: Ident,
        ResultSetHandle: Ident,
        VerticesCount: Integer,
    ): Void;
    SetOfVertices_DrawPoly(
        CenterSetHandle: Ident,
        PointOnPoly: Vec3,
        ResultSetHandle: Ident,
        VerticesCount: Integer,
    ): Void;
    SetOfVertices_DrawSpline(
        ControlSetHandle: Ident,
        ResultSetHandle: Ident,
    ): Void;
    SetOfVertices_Weld(
        VerticesSetHandle: Ident,
    ): Void;
    SetOfVertices_DrawBox(
        ControlSetHandle: Ident,
        ResultSetHandle: Ident,
    ): Void;
    SetOfEdges_Fill(
        SetHandle: Ident,
    ): Void;
    SetOfEdges_Flip(
        SetHandle: Ident,
        ResultSetHandle: Ident,
    ): Void;
    SetOfEdges_BorderExpand(
        SetHandle: Ident,
    ): Void;
    SetOfOneEdge_FaceLoopExpand(
        SetHandle: Ident,
    ): Void;
    SetOfOneEdge_EdgeLoopExpand(
        SetHandle: Ident,
    ): Void;
    SetOfOneFace_CutHole(
        FaceSetHandle: Ident,
        EdgesSetHandle: Ident,
    ): Void;
    SetOfFaces_Extrude(
        SetHandle: Ident,
        ResultSetHandle: Ident,
    ): Void;
    SetOfFaces_QuadsToTriangles(
        SetHandle: Ident,
        ResultSetHandle: Ident,
    ): Void;
    SetOfFaces_TrianglesToQuads(
        SetHandle: Ident,
        ResultSetHandle: Ident,
    ): Void;
    SetOfFaces_ApplyMaterial(
        SetHandle: Ident,
        MaterialId: Ident,
    ): Void;
    SetOfFaces_PlanarExpand(
        FacesSetHandle: Ident,
    ): Void;
    SetOfFaces_ChangeOrientation(
        FacesSetHandle: Ident,
    ): Void;
    PrefabNames: Array<Text>;
    PrefabNamesUpdateId: Integer;
    PrefabListCurrentPage: Integer;
    Prefab_TotalNb: Integer;
    Prefabs_Reload(): Void;
    Prefab_Export(): Void;
    Prefab_Import(
        PrefabIndex: Integer,
    ): Void;
    Parts_CanMergeParts(): Boolean;
    Parts_CanGroupParts(): Boolean;
    Parts_CanUngroupParts(): Boolean;
    Parts_GetOpsState(): Int3;
    Parts_MergeSelectedParts(): Void;
    Parts_Group(): Void;
    Parts_UngroupSelectedParts(): Void;
    Cut(): Void;
    Copy(): Void;
    AddUndoState(): Void;
    AutoSave(
        FileName: Text,
    ): Boolean;
    PendingEvents: Array<CEditorEvent>;
    MustClearLastSaveBuffer: Boolean;
    IsExperimental: Boolean;
    GetTitleCoreType(): CEditorMesh__ETitleCoreType;
}
export interface CEditorEditor extends CEditorBase {
    Bindings_AddContext(
        ContextName: Text,
    ): Void;
    Bindings_AddBinding(
        ContextName: Text,
        BindingScriptId: Text,
        BindingDisplayName: Text,
    ): Void;
    Bindings_RemoveContext(
        ContextName: Text,
    ): Void;
    Bindings_RemoveBinding(
        ContextName: Text,
        BindingName: Text,
    ): Void;
    Bindings_RequestInput(
        ContextName: Text,
        BindingName: Text,
    ): Void;
    Bindings_RequestInput_Done: Boolean;
    Bindings_SetBindingScriptId(
        ContextName: Text,
        BindingScriptId: Text,
        NewBindingScriptId: Text,
    ): Void;
    Bindings_SetBindingDisplayName(
        ContextName: Text,
        BindingScriptId: Text,
        BindingDisplayName: Text,
    ): Void;
    Bindings_SetContextName(
        ContextName: Text,
        NewContextName: Text,
    ): Void;
    BindingContexts: Array<Text>;
    Bindings_GetContextBindings(
        ContextName: Text,
    ): Void;
    RequestedContextBindings: Array<Text>;
    Bindings_GetBindingActionName(
        ContextName: Text,
        BindingName: Text,
    ): Text;
    Bindings_GetBindingDisplayName(
        ContextName: Text,
        BindingName: Text,
    ): Text;
    PendingEvents: Array<CEditorEvent>;
}
export interface CEditorPluginAPI extends CNod {
    NewFile(): Void;
    Undo(): Void;
    Redo(): Void;
    FileToolBarSendCmd(
        CmdName: Text,
    ): Void;
    SetToolBarButtonVisible(
        Type: CEditorPluginAPI__EEditorFileToolBar_QuadType,
    ): Boolean;
}
export interface CEditorMediaTracker extends CEditorPluginAPI {
    CurrentTimer: Real;
    UseOrbitalInsteadOfFreeCam: Boolean;
    UseClipCamWhenAvailable: Boolean;
    CanUseClipCam: Boolean;
    PlaySpeed: Real;
    CameraSpeed: Real;
    ClipConditionValue: Real;
    TimePlay(): Void;
    TimeStop(): Void;
    TimeToggle(): Void;
    Rewind(): Void;
    Quit(): Void;
    UpdatePropertyListReadOnly(): Void;
    CreateBlock(): Void;
    CreateKey(): Void;
    ToggleTriggersMode(): Void;
    CreateClip(): Void;
    RemoveClip(): Void;
    Undo(): Void;
    Redo(): Void;
    ImportClip(): Void;
    ExportClip(): Void;
    ImportGhosts(): Void;
    ToggleRecordGhostMode(): Void;
    ShootVideo(): Void;
    ShootScreen(): Void;
    ComputeShadows(): Void;
    ToggleDisplayPlayerNames(): Void;
    InformInterfaceIsHidden(): Void;
    ToggleGhostRef(): Void;
    StopGhostRefPreview(): Void;
    ToggleClipCondition(): Void;
    Copy(): Void;
    Paste(): Void;
    Cut(): Void;
    DuplicateTrack(): Void;
    SplitBlock(): Void;
    MergeTracks(): Void;
    ToggleAlwaysShowTriggerZone(): Void;
    ResetTriggerZone(): Void;
    RemoveAllTracks(): Void;
    Clip: CMediaTrackerClip;
    ClipGroup: CMediaTrackerClipGroup;
    PendingEvents: Array<CEditorEvent>;
    PopUpMessage: Text;
    EditMode: CEditorMediaTracker__EMediaTrackerBlockType;
    SetClip(
        Clip: CMediaTrackerClip,
    ): Void;
    IsPlaying(): Boolean;
    IsDevMode(): Boolean;
    SetCameraDrawRect(
        Pos: Vec2,
        Size: Vec2,
    ): Void;
    GetSelectedClip(): Integer;
    GetSelectedTrack(): Integer;
    GetSelectedBlock(): Integer;
    GetSelectedKey(): Integer;
    SelectItem(
        Track: Integer,
        Block: Integer,
        Key: Integer,
    ): Void;
    CreateTrack(
        Type: CEditorMediaTracker__EMediaTrackerBlockType,
    ): Void;
    CanCreateTrack(
        Type: CEditorMediaTracker__EMediaTrackerBlockType,
    ): Boolean;
    IsKeyStartEnd(
        Track: Integer,
        Block: Integer,
        Key: Integer,
    ): Boolean;
    RemoveTrack(
        Track: Integer,
    ): Void;
    RemoveBlock(
        Track: Integer,
        Block: Integer,
    ): Void;
    RemoveKey(
        Track: Integer,
        Block: Integer,
        Key: Integer,
    ): Void;
    CanRemoveAllKeys(
        Track: Integer,
        Block: Integer,
    ): Boolean;
    RemoveAllKeys(
        Track: Integer,
        Block: Integer,
    ): Void;
    SetProcessCamInputs(
        ProcessCamInputs: Boolean,
    ): Void;
    ToolBarSetVisible(
        Visible: Boolean,
    ): Void;
    IsTriggersModeOn(): Boolean;
    IsRecordGhostModeOn(): Boolean;
    SetTempHidePropertyList(
        TempHide: Boolean,
    ): Void;
    SetClipName(
        Index: Integer,
        Name: Text,
    ): Void;
    SetTrackName(
        Index: Integer,
        Name: Text,
    ): Void;
    SetTrackIsCycling(
        Track: CMediaTrackerTrack,
        IsCycling: Boolean,
    ): Void;
    SetTrackIsKeepPlaying(
        Track: CMediaTrackerTrack,
        IsKeepPlaying: Boolean,
    ): Void;
    GetTrackIsCycling(
        Track: CMediaTrackerTrack,
    ): Boolean;
    GetTrackIsKeepPlaying(
        Track: CMediaTrackerTrack,
    ): Boolean;
    SetStartIsCycling(
        Track: CMediaTrackerTrack,
    ): Void;
    SetStopIsCycling(
        Track: CMediaTrackerTrack,
    ): Void;
    GetStartIsCycling(
        Track: CMediaTrackerTrack,
    ): Real;
    GetStopIsCycling(
        Track: CMediaTrackerTrack,
    ): Real;
    GetGhostRefName(): Text;
    GetClipConditionName(): Text;
    HasClipCondition(): Boolean;
    GetTimeLimit(): Real;
    SetTimer(
        Time: Text,
    ): Void;
    SetCurrentBlockStart(
        Start: Text,
    ): Void;
    SetCurrentBlockEnd(
        End: Text,
    ): Void;
    CanCopy(): CEditorMediaTracker__EMediaTrackerCopyType;
    CanCut(): CEditorMediaTracker__EMediaTrackerCopyType;
    CanPaste(): CEditorMediaTracker__EMediaTrackerPasteType;
    HasCopiedItem(): Boolean;
    IsPropertyListReadOnlyAndVisible(): Boolean;
    SelectGhostRef(
        Type: CEditorMediaTracker__EMediaTrackerGhostRef,
    ): Void;
    DeleteGhostRef(
        Type: CEditorMediaTracker__EMediaTrackerGhostRef,
    ): Void;
    RecordGhostRef(
        Type: CEditorMediaTracker__EMediaTrackerGhostRef,
    ): Void;
    GhostRefExists(
        Type: CEditorMediaTracker__EMediaTrackerGhostRef,
    ): Boolean;
    GetSelectedGhostRef(): CEditorMediaTracker__EMediaTrackerGhostRef;
    StartGhostRefPreview(
        Type: CEditorMediaTracker__EMediaTrackerGhostRef,
    ): Void;
    RemoveAllGhostTracksExcept(
        Track: Integer,
    ): Void;
    RemoveAllCameraTracksExcept(
        Track: Integer,
    ): Void;
    CanRemoveAllGhostTracks(): Boolean;
    CanRemoveAllCameraTracks(): Boolean;
    IsGhostRefPreview(): Boolean;
    SetProfileTheme(
        Theme: Integer,
    ): Void;
    GetProfileTheme(): Integer;
}
export interface CEditorSkin extends CEditorPluginAPI {
    AllIcons: Array<CImage>;
    PendingEvents: Array<CEditorEvent>;
    CustomColors: Array<Vec3>;
    PainterMode: CEditorSkin__EPainterMode;
    PainterSolidType: CEditorSkin__EPainterSolidType;
    IsTextEnabled: Boolean;
    IsPickingColor: Boolean;
    IsErasing: Boolean;
    IsUsingShininessOnly: Boolean;
    IsBrushNormal: Boolean;
    IsTextSymmetry: Boolean;
    SubObjectsSelected: Array<Integer>;
    SubObjectsCount: Integer;
    LayersSelected: Array<Integer>;
    LayersCount: Integer;
    StickersSelected: Array<Integer>;
    StickersCount: Integer;
    BrushsSelected: Array<Integer>;
    BrushsCount: Integer;
    SubFolderElemSelected: Array<Integer>;
    CurSubFolderElemCount: Integer;
    Transparency: Real;
    Scale: Real;
    Rough: Real;
    Metal: Real;
    Color: Vec3;
    EditionLayersCount: Integer;
    IsEditingLayer: Boolean;
    EditionLayerSelected: Integer;
    SubObjectHovered: Integer;
    CurrentLayerSubObjectsSelected: Array<Integer>;
    CanUndo: Boolean;
    CanRedo: Boolean;
    TextToCreateBitmap: Text;
    IsFillWithReplacement: Boolean;
    SkinName: Text;
    IsSkinHelmetOk: Boolean;
    IsCameraButtonOn: Boolean;
    ToggleIsTextEnabled(): Void;
    ToggleIsPickingColor(): Void;
    TogglePaintSymMode(): Void;
    EditCurrentLayerSelected(): Void;
    AddAndEditLayer(): Void;
    CloseEditSelectedLayer(): Void;
    MoveSelectedLayerUp(): Void;
    MoveSelectedLayerDown(): Void;
    DeleteSelectedLayer(): Void;
    Undo(): Void;
    Redo(): Void;
    ExportSkin(): Void;
    AlignBrushSticker(): Void;
    AskSwitchEditedNodType(): Void;
    ToggleHelper(): Void;
    ToggleLight(): Void;
    ExportLayerEdition(): Void;
    ImportLayerEdition(): Void;
    GetAllIconFromId(
        Index: Integer,
        IconType: CEditorSkin__EEditorSkin_IconType,
    ): CImage;
    GetSubFolderIconFromId(
        FolderIndex: Integer,
        ElemIndex: Integer,
        IconType: CEditorSkin__EEditorSkin_IconType,
    ): CImage;
    GetLayerNameFromIndex(
        Index: Integer,
    ): Text;
    GetLayerVisibleFromIndex(
        Index: Integer,
    ): Boolean;
    SetLayerVisibleFromIndex(
        IsVisible: Boolean,
        Index: Integer,
    ): Void;
    SetPainterMode(
        Mode: CEditorSkin__EPainterMode,
    ): Boolean;
    GetSubObjectMaxPage(
        NbPerPage: Integer,
    ): Integer;
    GetMainFrameMaxPage(
        NbPerPage: Integer,
    ): Integer;
    OnLayerSelected(
        CurrentPage: Integer,
        Index: Integer,
    ): Void;
    OnStickerSelected(
        CurrentPage: Integer,
        Index: Integer,
    ): Void;
    OnBrushSelected(
        CurrentPage: Integer,
        Index: Integer,
    ): Void;
    OnSubFolderElemSelected(
        SubFolderCurrentPage: Integer,
        ElemIndex: Integer,
    ): Void;
    SetCurrentLayerSelectedName(
        Name: Text,
    ): Void;
    AddScale(
        Delta: Real,
    ): Void;
    AddAngle(
        DeltaRad: Real,
    ): Void;
    SetSubObjectIndexForLayer(
        SubObjectIndex: Integer,
        LayerIndex: Integer,
        ResetFirst: Boolean,
    ): Void;
    IsElemAtScriptIndexFolder(
        ScriptIndex: Integer,
        IconType: CEditorSkin__EEditorSkin_IconType,
    ): Boolean;
    GetFolderNameFromScriptIndex(
        ScriptIndex: Integer,
        IconType: CEditorSkin__EEditorSkin_IconType,
    ): Text;
    IsCtrlDown(): Boolean;
    GetSubObjectNameFromIndex(
        ScriptIndex: Integer,
    ): Text;
    OpenMediaFolder(
        SubFolderPath: Text,
    ): Void;
    ReloadResources(
        forSubObjects: Boolean,
    ): Void;
}
export interface CModuleMenuLayer extends CManiaAppTitleLayer {
    Components: Array<CModuleMenuComponent>;
    GetFirstComponent(
        Name: Text,
    ): CModuleMenuComponent;
}
export interface CTitleControl extends CNod {
    /**
     * Can a command be issued.
     */
    IsReady: Boolean;
    /**
     * Result of the latest command issued.
     */
    LatestResult: CTitleControl__EResult;
    CustomResultType: Text;
    CustomResultData: Array<Text>;
    PlayMap(
        Map: Text,
        Mode: Text,
        SettingsXml: Text,
    ): Void;
    PlayCampaign(
        Campaign: CCampaign,
        MapInfo: CMapInfo,
        Mode: Text,
        SettingsXml: Text,
    ): Void;
    PlayMapList(
        MapList: Array<Text>,
        Mode: Text,
        SettingsXml: Text,
    ): Void;
    PlayMatchSettings(
        MatchSettings: CMatchSettings,
        OverrideMode: Text,
        OverrideSettingsXml: Text,
    ): Void;
    PlayAgainstReplay(
        Replay: Text,
        Mode: Text,
        SettingsXml: Text,
    ): Void;
    PlaySplitScreen(
        LayoutType: CTitleControl__ESplitScreenLayout,
        MapList: Array<Text>,
        Mode: Text,
        SettingsXml: Text,
    ): Void;
    PlayMultiOnSameScreen(
        MapList: Array<Text>,
        Mode: Text,
        SettingsXml: Text,
    ): Void;
    PlaySplitScreen(
        LayoutType: CTitleControl__ESplitScreenLayout,
        MatchSettings: CMatchSettings,
    ): Void;
    PlayMultiOnSameScreen(
        MatchSettings: CMatchSettings,
    ): Void;
    ViewReplay(
        Replay: Text,
    ): Void;
    OpenEditor(
        EditorName: Text,
        MainPluginSettings: Text,
    ): Void;
    OpenEditor(
        EditorType: CTitleControl__EEditorType,
    ): Void;
    EditSkins(): Void;
    EditSkinsFromFileName(
        SkinFilePath: Text,
    ): Void;
    EditReplay(
        ReplayList: Array<Text>,
    ): Void;
    EditReplay(
        ReplayList: Array<Text>,
        EditType: CTitleControl__EReplayEditType,
    ): Void;
    EditGhosts(
        Map: Text,
    ): Void;
    EditAsset(
        EditorName: Text,
        MainPluginSettingsXml: Text,
        RelativeFileName: Text,
    ): Void;
    EditMap(
        Map: Text,
        EditorPluginScript: Text,
        EditorPluginArgument: Text,
    ): Void;
    EditMap(
        Map: Text,
        Decoration: Text,
        ModNameOrUrl: Text,
        PlayerModel: Text,
        EditorPluginScript: Text,
        EditorPluginArgument: Text,
    ): Void;
    EditMap(
        Map: Text,
        Decoration: Text,
        ModNameOrUrl: Text,
        PlayerModel: Text,
        EditorPluginScript: Text,
        EditorPluginArgument: Text,
        UpgradeToAdvancedEditor: Boolean,
    ): Void;
    EditMap(
        Map: Text,
        Decoration: Text,
        ModNameOrUrl: Text,
        PlayerModel: Text,
        EditorPluginsScripts: Array<Text>,
        EditorPluginsArguments: Array<Text>,
        UpgradeToAdvancedEditor: Boolean,
    ): Void;
    EditMap(
        Map: Text,
        Decoration: Text,
        ModNameOrUrl: Text,
        PlayerModel: Text,
        EditorPluginsScripts: Array<Text>,
        EditorPluginsArguments: Array<Text>,
        UpgradeToAdvancedEditor: Boolean,
        OnlyUseForcedPlugins: Boolean,
    ): Void;
    EditNewMap(
        Environment: Text,
        Decoration: Text,
        ModNameOrUrl: Text,
        PlayerModel: Text,
        MapType: Text,
        EditorPluginScript: Text,
        EditorPluginArgument: Text,
    ): Void;
    EditNewMap(
        Environment: Text,
        Decoration: Text,
        ModNameOrUrl: Text,
        PlayerModel: Text,
        MapType: Text,
        UseSimpleEditor: Boolean,
        EditorPluginScript: Text,
        EditorPluginArgument: Text,
    ): Void;
    EditNewMap(
        Environment: Text,
        Decoration: Text,
        ModNameOrUrl: Text,
        PlayerModel: Text,
        MapType: Text,
        UseSimpleEditor: Boolean,
        EditorPluginsScripts: Array<Text>,
        EditorPluginsArguments: Array<Text>,
    ): Void;
    EditNewMap(
        Environment: Text,
        Decoration: Text,
        ModNameOrUrl: Text,
        PlayerModel: Text,
        MapType: Text,
        UseSimpleEditor: Boolean,
        EditorPluginsScripts: Array<Text>,
        EditorPluginsArguments: Array<Text>,
        OnlyUseForcedPlugins: Boolean,
    ): Void;
    EditNewMapFromBaseMap(
        BaseMapName: Text,
        ModNameOrUrl: Text,
        PlayerModel: Text,
        MapType: Text,
        EditorPluginScript: Text,
        EditorPluginArgument: Text,
    ): Void;
    EditNewMapFromBaseMap(
        BaseMapName: Text,
        Decoration: Text,
        ModNameOrUrl: Text,
        PlayerModel: Text,
        MapType: Text,
        EditorPluginScript: Text,
        EditorPluginArgument: Text,
    ): Void;
    EditNewMapFromBaseMap(
        BaseMapName: Text,
        Decoration: Text,
        ModNameOrUrl: Text,
        PlayerModel: Text,
        MapType: Text,
        EditorPluginsScripts: Array<Text>,
        EditorPluginsArguments: Array<Text>,
        OnlyUseForcedPlugins: Boolean,
    ): Void;
    CanPublishFiles: Boolean;
    /**
     * Set FileName='' to open a file select dialog.
     */
    PublishFile(
        FileName: Text,
    ): Void;
    ProcessManiaCodeXml(
        ManiaCodeXml: Text,
    ): Void;
    LocalServers: Array<CServerInfo>;
    LocalServers_CurrentTitle: Array<CServerInfo>;
    DiscoverLocalServers(): Void;
    CreateServer(
        ServerName: Text,
        ServerComment: Text,
        MaxPlayerCount: Integer,
        Password: Text,
        PasswordSpectators: Text,
        MatchSettings: CMatchSettings,
    ): Void;
    CreateServer(
        ServerName: Text,
        ServerComment: Text,
        MaxPlayerCount: Integer,
        Password: Text,
        PasswordSpectators: Text,
        MatchSettings: CMatchSettings,
        LocalOnly: Boolean,
    ): Void;
    /**
     * Fetch the server info, from the account id, or 'IP:xxx.xxx.xxx.xxx' with LAN ip
     */
    GetServerInfo(
        ServerLogin: Text,
    ): Void;
    GetServerInfo(
        LocalServer: CServerInfo,
    ): Void;
    GetServerInfo_Abort(): Void;
    GetServerInfo_Result: CServerInfo;
    Join_GetServerInfo_Result(
        AsSpectator: Boolean,
        Password: Text,
    ): Void;
    /**
     * Join a server
     */
    JoinServer(
        ServerLogin: Text,
        AsSpectator: Boolean,
        Password: Text,
    ): Void;
    JoinServer_DisableSystemDialogs: Boolean;
    Quit(): Void;
}
export interface CManiaAppBase extends CManiaApp {
    PendingEvents: Array<CManiaAppEvent>;
}
export interface CManiaAppStation extends CManiaAppBase {
    Station: CStation;
    EnterStation(): Void;
    Maker_EditTitle(
        EditedTitleId: Text,
    ): Void;
    /**
     * A new title id will be derived from the EditedTitleName.
     */
    Maker_EditNewTitle(
        EditedTitleName: Text,
    ): Void;
    Maker_EditedTitles: Array<CPackCreatorTitleInfo>;
}
export interface CStation extends CNod {
    Title: CTitle;
    AudienceRegisteredUsers: Integer;
    CampaignMedalsMax: Integer;
    CampaignMedalsCurrent: Integer;
    CampaignMedalsRanking: Integer;
    LadderPoints: Real;
    LadderRank: Integer;
    Echelon: CStation__EEchelon;
    NextEchelonPercent: Integer;
    DisableQuickEnter: Boolean;
    IsLogoVisible: Boolean;
    GhostAlpha: Real;
    FocusLightColor: Vec3;
    NormalLightColor: Vec3;
    /**
     * Is title present in WorkTitles folder?
     */
    IsEditable: Boolean;
}
export interface CManiaAppBrowser extends CManiaApp {
    PendingEvents: Array<CManiaAppEvent>;
    BrowserBack(): Void;
    BrowserQuit(): Void;
    BrowserHome(): Void;
    BrowserReload(): Void;
    BrowserFocusedFrameId: Text;
}
export interface CMap extends CNod {
    MapInfo: CMapInfo;
    MapName: Text;
    Comments: Text;
    AuthorZoneIconUrl: Text;
    CollectionName: Text;
    DecorationName: Text;
    AuthorLogin: Text;
    AuthorNickName: Text;
    AuthorZonePath: Text;
    MapType: Text;
    MapStyle: Text;
    TMObjective_AuthorTime: Integer;
    TMObjective_GoldTime: Integer;
    TMObjective_SilverTime: Integer;
    TMObjective_BronzeTime: Integer;
    TMObjective_NbLaps: Integer;
    TMObjective_IsLapRace: Boolean;
    ObjectiveTextAuthor: Text;
    ObjectiveTextGold: Text;
    ObjectiveTextSilver: Text;
    ObjectiveTextBronze: Text;
    CopperPrice: Integer;
    Size: Int3;
    HasCustomIntro: Boolean;
    HasCustomMusic: Boolean;
}
export interface CMlFrame extends CMlControl {
    Controls: Array<CMlControl>;
    GetFirstChild(
        ControlId: Text,
    ): CMlControl;
    ScrollActive: Boolean;
    ScrollOffset: Vec2;
    ScrollAnimOffset: Vec2;
    ScrollMax: Vec2;
    ScrollMin: Vec2;
    ScrollGridSnap: Boolean;
    ScrollGrid: Vec2;
    Scroll(
        DeltaInGridUnits: Vec2,
    ): Void;
    ScrollBumpTop(): Void;
    ScrollBumpBottom(): Void;
    ScrollBumpLeft(): Void;
    ScrollBumpRight(): Void;
    DisablePreload: Boolean;
}
export interface CMlColorPicker extends CMlControl {
    Color: Vec3;
}
export interface CMlTimeLine extends CMlControl {
    Time: Real;
    TimeMin: Real;
    TimeMax: Real;
    Page: Integer;
    TracksPerPage: Integer;
    IsDraggingCursor: Boolean;
    IsDraggingBlock: Boolean;
    IsDraggingKey: Boolean;
    IsScaling: Boolean;
    IsPanning: Boolean;
    ShowFullTimeLine(): Void;
    ResetCycling(): Void;
    SetSimpleMediaTrackerPilot(
        MediaTracker: CEditorMediaTracker,
    ): Void;
    SetSelection(
        Track: Integer,
        Block: Integer,
        Key: Integer,
    ): Void;
    SetSeparatorColor(
        HexColor: Text,
    ): Void;
    SetBgColor(
        HexColor: Text,
    ): Void;
    SetCursorColor(
        HexColor: Text,
    ): Void;
    SetRulerColor(
        HexColor: Text,
    ): Void;
    SetRulerLineColor(
        HexColor: Text,
    ): Void;
    SetKeyColor(
        HexColor: Text,
    ): Void;
    SetStartIsCycling(
        Time: Real,
    ): Void;
    SetStopIsCycling(
        Time: Real,
    ): Void;
    SetTimeLimit(
        TimeLimit: Real,
    ): Void;
}
export interface CMlSlider extends CMlControl {
    Value: Real;
    MinRange: Real;
    MaxRange: Real;
}
export interface CMlMediaPlayer extends CMlControl {
    IsInitPlay: Boolean;
    Music: Boolean;
    IsLooping: Boolean;
    Volume: Real;
    Url: Text;
    Play(): Void;
    Stop(): Void;
    StopAndRewind(): Void;
}
export interface CMlGraph extends CMlControl {
    CoordsMin: Vec2;
    CoordsMax: Vec2;
    AddCurve(): CMlGraphCurve;
    RemoveCurve(
        Curve: CMlGraphCurve,
    ): Void;
    Curves: Array<CMlGraphCurve>;
}
export interface CMlGauge extends CMlControl {
    Style: Text;
    SetRatio(
        NewRatio: Real,
    ): Void;
    SetClan(
        NewClan: Integer,
    ): Void;
    /**
     * Values in range (0.000000-1.000000)
     */
    Ratio: Real;
    /**
     * Values in range (0.000000-1.000000)
     */
    GradingRatio: Real;
    Clan: Integer;
    Color: Vec3;
    DrawBackground: Boolean;
    DrawBlockBackground: Boolean;
    CenteredBar: Boolean;
}
export interface CMlCamera extends CMlControl {
    Fullscreen: Boolean;
}
export interface CMlTextEdit extends CMlControl {
    Value: Text;
    StartEdition(): Void;
    MaxLine: Integer;
    AutoNewLine: Boolean;
    ShowLineNumbers: Boolean;
    LineSpacing: Real;
    ValueLineCount: Integer;
    Opacity: Real;
    TextColor: Vec3;
    TextSizeReal: Real;
    TextFormat: CMlTextEdit__EControlScriptEditorTextFormat;
}
export interface CMlEntry extends CMlControl {
    Value: Text;
    StartEdition(): Void;
    SetText(
        NewText: Text,
        SendSubmitEvent: Boolean,
    ): Void;
    TextFormat: CMlEntry__ETextFormat;
    Opacity: Real;
    TextColor: Vec3;
    TextSizeReal: Real;
    MaxLength: Integer;
    GetValueType(): CMlEntry__ValueType;
    SetValueType(
        ValueType: CMlEntry__ValueType,
    ): Void;
}
export interface CMlLabel extends CMlControl {
    Style: Text;
    Substyle: Text;
    TextFont: Text;
    SetText(
        NewText: Text,
    ): Void;
    Value: Text;
    ValueLineCount: Integer;
    MaxLine: Integer;
    LineSpacing: Real;
    ItalicSlope: Real;
    AppendEllipsis: Boolean;
    AutoNewLine: Boolean;
    Opacity: Real;
    /**
     * Used to include styling attributes like $s,$o...
     */
    TextPrefix: Text;
    TextColor: Vec3;
    TextSizeReal: Real;
    Blend: CMlLabel__EBlendMode;
    ComputeWidth(
        Text: Text,
    ): Real;
    ComputeWidth(
        Text: Text,
        Translated: Boolean,
    ): Real;
    ComputeHeight(
        Text: Text,
    ): Real;
    TTS_AltText: Text;
    TTS_AltText_Translate: Boolean;
    TTS_Focus(): Void;
    TTS_Unfocus(): Void;
    FilterProfanities: CMlLabel__EFilterProfanities;
}
export interface CMlMinimap extends CMlControl {
    WorldPosition: Vec3;
    MapPosition: Vec2;
    MapYaw: Real;
    /**
     * Values in range (0.500000-10.000000)
     */
    ZoomFactor: Real;
    Underground: Boolean;
    DisableAutoUnderground: Boolean;
    Fog_SetAll(
        Value: Real,
    ): Void;
    Fog_ClearDisk(
        WorldCenter: Vec3,
        Radius: Real,
        FadeSize: Real,
    ): Void;
}
export interface CMlQuad extends CMlControl {
    ChangeImageUrl(
        fieldName: Text,
    ): Void;
    Image: CImage;
    ImageUrl: Text;
    ImageUrlFocus: Text;
    AlphaMaskUrl: Text;
    Style: Text;
    Substyle: Text;
    StyleSelected: Boolean;
    DownloadInProgress: Boolean;
    SuperSample: Boolean;
    Colorize: Vec3;
    ModulateColor: Vec3;
    BgColor: Vec3;
    BgColorFocus: Vec3;
    Opacity: Real;
    KeepRatio: CMlQuad__EKeepRatioMode;
    Blend: CMlQuad__EBlendMode;
    RefreshImages(): Void;
    TTS_Focus(): Void;
    TTS_Unfocus(): Void;
    TTS_AltText: Text;
    TTS_AltText_Translate: Boolean;
}
export interface CParsingDocument extends CNod {
    TextContents: Text;
    Root: CParsingNode;
    Nodes: Array<CParsingNode>;
    GetFirstChild(
        Name: Text,
    ): CParsingNode;
}
export interface CHttpRequest extends CNod {
    /**
     * Url of the request
     */
    Url: Text;
    /**
     * Result available once IsCompleted and StatusCode = 200
     */
    Result: Text;
    /**
     * HTTP status code
     */
    StatusCode: Integer;
    IsCompleted: Boolean;
}
export interface CHttpEvent extends CNod {
    Type: CHttpEvent__EType;
    /**
     * Request triggering the event
     */
    Request: CHttpRequest;
}
export interface CVideo extends CNod {
    Image: CImage;
    IsLooping: Boolean;
    DownloadInProgress: Boolean;
    PlayLength: Real;
    BeginProcessing(): Void;
    EndProcessing(): Void;
    IsProcessing: Boolean;
    /**
     * Automatically begin processing when the layer becomes visible and end when hidden.
     */
    AutoProcessing: Boolean;
    Play(): Void;
    Pause(): Void;
    Stop(): Void;
    IsPlaying: Boolean;
    /**
     * note: seeking not implemented, setting a value is ignored.
     */
    PlayCursor: Real;
    TextureFilter: CVideo__ETextureFilter;
}
export interface CAudioSource extends CNod {
    Play(): Void;
    Stop(): Void;
    IsPlaying: Boolean;
    DownloadInProgress: Boolean;
    Volume: Real;
    FadeDuration: Real;
    VolumedB: Real;
    Pitch: Real;
    RelativePosition: Vec3;
    PanRadiusLfe: Vec3;
    PlayCursor: Real;
    PlayLength: Real;
}
export interface CAudioSourceMusic extends CAudioSource {
    Tracks_Volume: Array<Real>;
    Tracks_VolumedB: Array<Real>;
    Tracks_Name: Array<Text>;
    Tracks_Length: Array<Real>;
    Tracks_Count: Integer;
    BeatsPerMinute: Real;
    BeatDuration: Real;
    BeatsPerBar: Integer;
    UpdateMode: CAudioSourceMusic__EUpdateMode;
    Dbg_ForceIntensity: Boolean;
    Dbg_ForceSequential: Boolean;
    Dbg_ForceRandom: Boolean;
    /**
     * Values in range (0.000000-1.000000)
     */
    LPF_CutoffRatio: Real;
    /**
     * Values in range (0.100000-20.000000)
     */
    LPF_Q: Real;
    /**
     * Values in range (0.000000-1.000000)
     */
    HPF_CutoffRatio: Real;
    /**
     * Values in range (0.100000-20.000000)
     */
    HPF_Q: Real;
    FadeTracksDuration: Real;
    FadeFiltersDuration: Real;
    MuteAllTracks(): Void;
    UnmuteAllTracks(): Void;
    NextVariant(): Void;
    NextVariant(
        IsIntensityDecreasing: Boolean,
    ): Void;
    EnableSegment(
        SegmentName: Text,
    ): Void;
    UseNewImplem: Boolean;
}
export interface CInputEvent extends CNod {
    Type: CInputEvent__EType;
    Pad: CInputPad;
    Button: CInputEvent__EButton;
    IsAutoRepeat: Boolean;
    KeyCode: Integer;
    KeyName: Text;
}
export interface CInputPad extends CNod {
    ControllerId: Integer;
    UserId: Ident;
    Type: CInputPad__EPadType;
    ModelName: Text;
    IdleDuration: Integer;
    Left: Integer;
    Right: Integer;
    Up: Integer;
    Down: Integer;
    A: Integer;
    B: Integer;
    X: Integer;
    Y: Integer;
    L1: Integer;
    R1: Integer;
    LeftStickBut: Integer;
    RightStickBut: Integer;
    Menu: Integer;
    View: Integer;
    /**
     * Values in range (-1.000000-1.000000)
     */
    LeftStickX: Real;
    /**
     * Values in range (-1.000000-1.000000)
     */
    LeftStickY: Real;
    /**
     * Values in range (-1.000000-1.000000)
     */
    RightStickX: Real;
    /**
     * Values in range (-1.000000-1.000000)
     */
    RightStickY: Real;
    /**
     * Values in range (0.000000-1.000000)
     */
    L2: Real;
    /**
     * Values in range (0.000000-1.000000)
     */
    R2: Real;
    ButtonEvents: Array<CInputPad__EButton>;
    ClearRumble(): Void;
    /**
     * Duration = 0 --> forever.
     */
    AddRumble(
        Duration: Integer,
        LargeMotor: Real,
        SmallMotor: Real,
    ): Void;
    /**
     * (only works on PS4.)  set to (0,0,0) to reset back to default color.
     */
    SetColor(
        Color: Vec3,
    ): Void;
}
export interface CCampaign extends CNod {
    CampaignId: Text;
    MapGroups: Array<CMapGroup>;
    GetMapGroupCount(): Integer;
    GetMapGroup(
        Index: Integer,
    ): CMapGroup;
    GetNextMap(
        CurrentMapInfo: CMapInfo,
    ): CMapInfo;
    ScoreContext: Text;
    OfficialRecordEnabled: Boolean;
}
export interface CWebServicesTaskResult_NadeoServicesItemCollection extends CTaskResult {
}
export interface CTaskResult_NSItemCollection extends CWebServicesTaskResult_NadeoServicesItemCollection {
    /**
     * ItemCollection info retrieve from NadeoServices contained by this result.
     */
    ItemCollection: CNadeoServicesItemCollection;
}
export interface CWebServicesTaskResult_NadeoServicesItemCollectionList extends CTaskResult {
}
export interface CTaskResult_NSItemCollectionList extends CWebServicesTaskResult_NadeoServicesItemCollectionList {
    /**
     * List of ItemCollection info retrieve from NadeoServices contained by this result.
     */
    ItemCollectionList: Array<CNadeoServicesItemCollection>;
}
export interface CTaskResult_MapList extends CTaskResult {
    /**
     * Path of the parent zone.
     */
    ParentPath: Text;
    /**
     * Path of the current zone.
     */
    Path: Text;
    /**
     * List of the map info. Array of CMapInfo objects.
     */
    MapInfos: Array<CMapInfo>;
    /**
     * List of the sub folders. Array of string.
     */
    SubFolders: Array<Text>;
}
export interface CWebServicesTaskResult_NadeoServicesMap extends CTaskResult {
}
export interface CTaskResult_NSMap extends CWebServicesTaskResult_NadeoServicesMap {
    /**
     * Map info retrieve from NadeoServices contained by this result.
     */
    Map: CNadeoServicesMap;
}
export interface CWebServicesTaskResult_NadeoServicesMapList extends CTaskResult {
}
export interface CTaskResult_NSMapList extends CWebServicesTaskResult_NadeoServicesMapList {
    /**
     * List of map info retrieve from NadeoServices contained by this result.
     */
    MapList: Array<CNadeoServicesMap>;
}
export interface CWebServicesTaskResult_NadeoServicesSkin extends CTaskResult {
}
export interface CTaskResult_NSSkin extends CWebServicesTaskResult_NadeoServicesSkin {
    /**
     * Skin info retrieve from NadeoServices contained by this result.
     */
    Skin: CNadeoServicesSkin;
}
export interface CWebServicesTaskResult_NadeoServicesSkinList extends CTaskResult {
}
export interface CTaskResult_NSSkinList extends CWebServicesTaskResult_NadeoServicesSkinList {
    /**
     * List of Skin info retrieve from NadeoServices contained by this result.
     */
    SkinList: Array<CNadeoServicesSkin>;
}
export interface CTaskResult_ReplayList extends CTaskResult {
    /**
     * Path of the parent zone.
     */
    ParentPath: Text;
    /**
     * Path of the current zone.
     */
    Path: Text;
    /**
     * List of the replay info. Array of CReplayInfo objects.
     */
    ReplayInfos: Array<CReplayInfo>;
    /**
     * List of the sub folders. Array of string.
     */
    SubFolders: Array<Text>;
}
export interface CTaskResult_GhostList extends CTaskResult {
    /**
     * List of ghost. Array of CGhost.
     */
    Ghosts: Array<CGhost>;
}
export interface CTaskResult_FileList extends CTaskResult {
    /**
     * Path of the parent zone.
     */
    ParentPath: Text;
    /**
     * Path of the current zone.
     */
    Path: Text;
    /**
     * List of files. Array of string.
     */
    Files: Array<Text>;
    /**
     * List of the sub folders. Array of string.
     */
    SubFolders: Array<Text>;
}
export interface CTaskResult_GameModeList extends CTaskResult {
    /**
     * Description of the GameMode
     */
    GameModes: Array<CTaskResult_ModeInfo>;
}
export interface CWebServicesTaskResult_WSMapRecordList extends CTaskResult {
}
export interface CTaskResult_MapRecordList extends CWebServicesTaskResult_WSMapRecordList {
    /**
     * List of map record info retrieve from NadeoServices contained by this result.
     */
    MapRecordList: Array<CMapRecord>;
}
export interface CWebServicesTaskResult_Natural extends CTaskResult {
    Value: Integer;
}
export interface CTaskResult_BuddiesChallengeRecord extends CTaskResult {
    /**
     * Login of the user who has launched the task.
     */
    Login: Text;
    BuddiesChallengeRecord: Array<CHighScoreComparison>;
    /**
     * Sort the results by opponent record count.
     */
    SortByOpponentCount(): Void;
    /**
     * Sort the results by opponent display name.
     */
    SortByOpponentDisplayName(): Void;
    /**
     * Sort the results by opponent login.
     */
    SortByOpponentLogin(): Void;
    /**
     * Sort the results by opponent record date.
     */
    SortByOpponentRecordDate(): Void;
    /**
     * Sort the results by opponent record time.
     */
    SortByOpponentRecordTime(): Void;
}
export interface CTaskResult_BuddiesChallengeRecordsComparison extends CTaskResult {
    /**
     * Login of the user who has launched the task.
     */
    Login: Text;
    /**
     * List of comparison summary between user records and buddy records. Array of CHighScoreComparisonSummary objects.
     */
    BuddiesComparison: Array<CHighScoreComparisonSummary>;
    /**
     * Sort the results by user best record count.
     */
    SortByPlayerCount(): Void;
    /**
     * Sort the results by opponent login.
     */
    SortByOpponentLogin(): Void;
    /**
     * Sort the results by opponent best record count.
     */
    SortByOpponentCount(): Void;
    /**
     * Sort the results by opponent last record date.
     */
    SortByOpponentDate(): Void;
    /**
     * Sort the results by opponent display name.
     */
    SortByOpponentDisplayName(): Void;
}
export interface CTaskResult_BuddyChallengeRecordsComparison extends CTaskResult {
    /**
     * Login of the user who has launched the task.
     */
    Login: Text;
    /**
     * Buddy login.
     */
    BuddyLogin: Text;
    /**
     * List of best challenge records for user. Array of CHighScoreComparison objects.
     */
    PlayerBestRecordsComparison: Array<CHighScoreComparison>;
    /**
     * List of best challenge records for buddy. Array of CHighScoreComparison objects.
     */
    BuddyBestRecordsComparison: Array<CHighScoreComparison>;
    /**
     * Sort the results by map name.
     */
    SortByMapName(): Void;
    /**
     * Sort the results by record time.
     */
    SortByRecordTime(): Void;
    /**
     * Sort the results by record time diff.
     */
    SortByRecordTimeDiff(): Void;
    /**
     * Sort the results by record date.
     */
    SortByRecordDate(): Void;
}
export interface CTaskResult_NaturalLeaderBoardInfoList extends CTaskResult {
    /**
     * Starting index.
     */
    FromIndex: Integer;
    /**
     * Number of item contained.
     */
    Count: Integer;
    /**
     * List of the ranking info. Array of CNaturalLeaderBoardInfo objects.
     */
    LeaderBoardInfo: Array<CNaturalLeaderBoardInfo>;
}
export interface CWebServicesTaskResult_Season extends CTaskResult {
}
export interface CTaskResult_Season extends CWebServicesTaskResult_Season {
    /**
     * Season info contained by this result.
     */
    Season: CSeason;
}
export interface CWebServicesTaskResult_SeasonList extends CTaskResult {
}
export interface CTaskResult_SeasonList extends CWebServicesTaskResult_SeasonList {
    /**
     * List of season contained by this result.
     */
    SeasonList: Array<CSeason>;
}
export interface CTaskResult_RealLeaderBoardInfoList extends CTaskResult {
    /**
     * Starting index.
     */
    FromIndex: Integer;
    /**
     * Number of item contained.
     */
    Count: Integer;
    /**
     * List of the ranking info. Array of CRealLeaderBoardInfo objects.
     */
    LeaderBoardInfo: Array<CRealLeaderBoardInfo>;
}
export interface CWebServicesTaskResult_AccountTrophyGainHistory extends CTaskResult {
}
export interface CTaskResult_AccountTrophyGainHistory extends CWebServicesTaskResult_AccountTrophyGainHistory {
    /**
     * List of account trophy gain contained in this result.
     */
    AccountTrophyGainList: Array<CAccountTrophyGainForHistory>;
    AccountTrophyGainTotalCount: Integer;
}
export interface CWebServicesTaskResult_AccountTrophyLastYearSummary extends CTaskResult {
}
export interface CTaskResult_AccountTrophyLastYearSummary extends CWebServicesTaskResult_AccountTrophyLastYearSummary {
    /**
     * Last year summary of account trophy contained by this result.
     */
    Summary: CAccountTrophyLastYearSummary;
}
export interface CWebServicesTaskResult_TrophySoloMedalAchievementSettings extends CTaskResult {
}
export interface CTaskResult_TrophySoloMedalAchievementSettings
    extends CWebServicesTaskResult_TrophySoloMedalAchievementSettings {
    /**
     * Settings of a solo medal trophy achievement contained by this result.
     */
    Settings: CTrophySoloMedalAchievementSettings;
}
export interface CWebServicesTaskResult_WSZonePtrList extends CTaskResult {
}
export interface CTaskResult_ZoneList extends CWebServicesTaskResult_WSZonePtrList {
    /**
     * List of zones. Array of CRankingsZone objects.
     */
    ZoneList: Array<CZone>;
    /**
     * Get a zone into the list from a zone id. Must be called after the task has succeeded.
     */
    GetZone(
        ZoneId: Text,
    ): CZone;
}
export interface CTaskResult_UserZoneList extends CTaskResult {
    ZoneList: Array<CZone>;
    /**
     * Get a zone for a user. Must be called after the task has succeeded.
     */
    GetUserZone(
        WebServicesUserId: Text,
    ): CZone;
}
export interface CUserV2Profile extends CNod {
    CanChangePassword: Boolean;
    CanChangeNickName: Boolean;
    /**
     * avatar, horn and podium pose
     */
    CanChangeAvatar: Boolean;
    CanChangeSkin: Boolean;
    CanChangeZone: Boolean;
    CanChangeGroups: Boolean;
    Account_ResetChanges(): Void;
    Account_Name: Text;
    Account_EMail: Text;
    Account_AcceptNews: Boolean;
    Account_EnableAutoConnect: Boolean;
    /**
     * Values in range (0.000000-1.000000)
     */
    User_LightTrailHue: Real;
    /**
     * Values in range (0.500000-2.000000)
     */
    User_HornPitch: Real;
    User_Description: Text;
    User_ClubLinkUrl: Text;
    User_Trigram: Text;
    User_ForceEmptyPilotSkin: Boolean;
    User_CharacterSkinOptions: Text;
    User_CombinePrestigeAndSkins: Boolean;
    Custom_EnableAvatars: Boolean;
    Custom_EnableChat: Boolean;
    Custom_PlayerModels: CUserV2Profile__ECustomPlayerModels;
    Custom_EnableUnlimitedHorns: Boolean;
    /**
     * Favoured way to open the Map Editor
     */
    Editors_MapEditorMode: CUserV2Profile__EMapEditorMode;
    Editors_MapEditorUseQuickstart: Boolean;
    Editors_MapEditorQuickstartUseGamepad: Boolean;
    Editors_MapEditorQuickstartDifficulty: CUserV2Profile__EMapEditorDifficulty;
    Editors_MapEditorQuickstartMood: CUserV2Profile__EMapEditorMood;
    Online_AutoSaveReplay: Boolean;
    Online_SaveRoundReplaysSeparately: Boolean;
    Online_DefaultOpponentVisibility: CUserV2Profile__EPlayerVisibility;
    Online_RoadsideSpectatorVisibility: CUserV2Profile__ERoadsideSpectatorVisibility;
    Title_IsForbiddenWithParentalLock: Boolean;
    AddictionLimiter_DailyQuotaMinutes: Integer;
    Steam_OpenLinksInSteam: Boolean;
    Steam_SynchonizeWorkshopFiles: Boolean;
    Interface_CrosshairEnableCustomColor: Boolean;
    /**
     * Values in range (0.000000-1.000000)
     */
    Interface_CrosshairSaturation: Real;
    /**
     * Values in range (0.000000-1.000000)
     */
    Interface_CrosshairLinearHue: Real;
    /**
     * Values in range (0.100000-2.000000)
     */
    Interface_CrosshairSize: Real;
    /**
     * Values in range (0.100000-1.000000)
     */
    Interface_CrosshairOpacity: Real;
    Interface_CrosshairName: Text;
    /**
     * Values in range (0.100000-2.000000)
     */
    Interface_PlayerShieldScale: Real;
    Interface_AllyEnableCustomColor: Boolean;
    /**
     * Values in range (0.000000-1.000000)
     */
    Interface_AllyLinearHue: Real;
    Interface_OppoEnableCustomColor: Boolean;
    /**
     * Values in range (0.000000-1.000000)
     */
    Interface_OppoLinearHue: Real;
    Interface_BeaconUseProfileColor: Boolean;
    /**
     * Values in range (0.000000-1.000000)
     */
    Interface_BeaconOpacity: Real;
    /**
     * Values in range (0.100000-5.000000)
     */
    Interface_BeaconSize: Real;
    /**
     * Values in range (0.500000-15.000000)
     */
    Interface_BeaconDuration: Real;
    Interface_InternalCamLocalPlayerVisibility: CUserV2Profile__EPlayerVisibility;
    Interface_UseOldInternalCam: Boolean;
    Interface_UseAlternateCam1: Boolean;
    Interface_UseAlternateCam2: Boolean;
    Interface_ShowSpecialsFeedback: Boolean;
    Interface_AlwaysDisplayRecords: Boolean;
    Interface_AllowChatHiding: Boolean;
    Interface_ColorblindMode: Boolean;
    Interface_IngameChatBackground: CUserV2Profile__EIngameChatBackground;
    Interface_IngameChatTextSize: CUserV2Profile__EIngameChatTextSize;
    Inputs_MouseLookInvertY: Boolean;
    Inputs_MouseReleaseKey: CUserV2Profile__EInputMouseReleaseKey;
    /**
     * Values in range (0.100000-3.000000)
     */
    Inputs_MouseScaleY: Real;
    /**
     * Values in range (0.100000-3.000000)
     */
    Inputs_MouseScaleFreeLook: Real;
    /**
     * Values in range (0.000000-3.000000)
     */
    Inputs_MouseAccel: Real;
    /**
     * Values in range (-1.000000-1.000000)
     */
    Inputs_MouseSensitivityDefault: Real;
    /**
     * Values in range (-1.000000-1.000000)
     */
    Inputs_MouseSensitivityLaser: Real;
    Inputs_MouseSensitivityDefault_Raw: Real;
    Inputs_MouseSensitivityLaser_Raw: Real;
    Inputs_Vehicles: Array<CVehicleSettings>;
    Adverts_Enabled: Boolean;
    Adverts_UsePersonnalData: Boolean;
    TTS_Enabled: Boolean;
    STT_Enabled: Boolean;
    VoiceChat_Loopback: Boolean;
    VoiceChat_Enabled: Boolean;
    STT_Available: Boolean;
    VoiceChat_SendTextAsVoice: Boolean;
}
export interface CTaskResult_StringIntList extends CTaskResult {
    Values: Array<Text>;
}
export interface CMasterServerUser extends CNod {
    NeedToChangeZone: Boolean;
    /**
     * Number of level in the full path of the user zone.
     */
    ZoneLevelCount: Integer;
    /**
     * Returns the zone path of the indicated level.
     */
    GetZone(
        ZoneLevel: Integer,
    ): Text;
    MultiInternetPlayTimeLeft: Integer;
    /**
     * Login.
     */
    Login: Text;
    /**
     * Display name.
     */
    DisplayName: Text;
    /**
     * Connection status: NotConnected, Connecting, Connected or Disconnecting.
     */
    ConnectionStatus: CMasterServerUser__EMasterServerConnectionStatus;
    LastConnectionErrorType: Text;
    LastConnectionErrorCode: Text;
    LastConnectionErrorDescription: Text;
}
export interface CTaskResult_Connect extends CTaskResult {
}
export interface CTaskResult_Bool extends CTaskResult {
    Value: Boolean;
}
export interface CWebServicesTaskResult_WSFriendList extends CTaskResult {
}
export interface CTaskResult_FriendList extends CWebServicesTaskResult_WSFriendList {
    /**
     * List of friend info contained by this result.
     */
    FriendList: Array<CFriend>;
}
export interface CTaskResult_Session_Get extends CTaskResult {
    SessionId: Text;
    ServerLogin: Text;
    ServerPassword: Text;
}
export interface CWebServicesTaskResult_WSNewsList extends CTaskResult {
}
export interface CTaskResult_UserNewsList extends CWebServicesTaskResult_WSNewsList {
    NewsList: Array<CNews>;
}
export interface CWebServicesTaskResult_WSUserPrestigeList extends CTaskResult {
}
export interface CTaskResult_UserPrestigeList extends CWebServicesTaskResult_WSUserPrestigeList {
    UserPrestigeList: Array<CUserPrestige>;
}
export interface CWebServicesTaskResult_WSUserPrestige extends CTaskResult {
}
export interface CTaskResult_UserPrestige extends CWebServicesTaskResult_WSUserPrestige {
    UserPrestige: CUserPrestige;
    HasUserPrestige: Boolean;
}
export interface CWebServicesTaskResult_WSPrestigeList extends CTaskResult {
}
export interface CTaskResult_PrestigeList extends CWebServicesTaskResult_WSPrestigeList {
    PrestigeList: Array<CPrestige>;
}
export interface CWebServicesTaskResult_Squad extends CTaskResult {
}
export interface CTaskResult_Squad extends CWebServicesTaskResult_Squad {
    /**
     * Squad info contained by this result.
     */
    Squad: CSquad;
}
export interface CTaskResult_StringInt extends CTaskResult {
    Value: Text;
}
export interface CTaskResult_ClubTagList extends CTaskResult {
    /**
     * Get a club name for a webservices user id. Must be called after the task has succeeded.
     */
    GetClubTag(
        WebServicesUserId: Text,
    ): Text;
}
export interface CWebServicesTaskResult_WSNotification extends CTaskResult {
}
export interface CTaskResult_WSNotification extends CWebServicesTaskResult_WSNotification {
    /**
     * Notification info contained by this result.
     */
    Notification: CNotification;
}
export interface CModuleMenu extends CManiaAppTitle {
    Menu_Goto(
        PageId: Text,
    ): Void;
    Menu_Back(): Void;
    Menu_Previous(): Void;
    Menu_Quit(): Void;
}
export interface CManiaAppEvent extends CBaseConstEvent {
    Type: CManiaAppEvent__EType;
    CustomEventLayer: CUILayer;
    CustomEventType: Text;
    CustomEventData: Array<Text>;
    ExternalEventType: Text;
    ExternalEventData: Array<Text>;
    MenuNavAction: CManiaAppEvent__EMenuNavAction;
    IsActionAutoRepeat: Boolean;
    KeyCode: Integer;
    KeyName: Text;
}
export interface CTitleEdition extends CNod {
    TitleMaker: CTitle;
    /**
     * PackCreator - only available when the title author is the current logged user.
     */
    PackCreator: CPackCreator;
    EditedTitleId: Text;
    EditedTitleInfo: CPackCreatorTitleInfo;
    /**
     * Will copy file 'FileName' from the UserDir to the TitleDir, including its dependencies.
     */
    File_ImportFromUser(
        FileName: Text,
    ): Void;
    /**
     * Will move or copy file 'OrigName' to 'DestName'. If DestName is a '\' terminated folder path, keeps the orginial short name.
     */
    File_Move(
        OrigName: Text,
        DestNameOrFolder: Text,
        KeepOriginalCopy: Boolean,
    ): Void;
    File_Exists(
        FileName: Text,
        InDrive: CTitleEdition__EDrive,
    ): Boolean;
    File_Delete(
        Name: Text,
    ): Void;
    File_WriteText(
        FileName: Text,
        Text: Text,
    ): Void;
    File_ReadText(
        FileName: Text,
    ): Text;
    Dialog_ImportFiles(): Void;
    Dialog_IsFinished: Boolean;
    Dialog_Success: Boolean;
    Dialog_Aborted: Boolean;
    OpenTitleFolderInExplorer(): Void;
    ReloadTitleDesc(): Void;
    SaveTitleDesc(): Void;
    /**
     * nb: The maps from the campaign are automatically added to the pack, no need to Build_AddFile().
     */
    SetTitleCampaign(
        CampaignNum: Integer,
        ScoreContext: Text,
        MapsFolderNameOrPlayListName: Text,
        OfficialRecordEnabled: Boolean,
    ): Void;
    SetTitleCampaign(
        CampaignNum: Integer,
        ScoreContext: Text,
        MapsFolderNameOrPlayListName: Text,
        OfficialRecordEnabled: Boolean,
        DisableUnlockSystem: Boolean,
    ): Void;
}
export interface CNotificationsConsumer extends CNod {
    /**
     * Events
     */
    Events: Array<CNotificationsConsumerEvent>;
    /**
     * List of the Notifications.
     */
    Notifications: Array<CNotificationsConsumerNotification>;
    FilteredNotifications: Array<CNotificationsConsumerNotification>;
    Filter_Priority: CNotificationsConsumer__EFilterPriority;
}
export interface CMatchSettingsManager extends CNod {
    /**
     * Clear all matchsettings files and reload them from disk. Be aware that any non-saved changes will be lost. Temporary matchsettings are not changed.
     */
    MatchSettings_RefreshFiles(): Void;
    MatchSettings_FindFile(
        FilePath: Text,
    ): CMatchSettings;
    /**
     * Create a new matchsettings file.
     */
    MatchSettings_CreateFile(
        FilePath: Text,
    ): CMatchSettings;
    /**
     * Create a new temporary matchsettings. Those will be lost when the game is closed.
     */
    MatchSettings_CreateTemp(): CMatchSettings;
    /**
     * Save a matchsettings file.
     */
    MatchSettings_Save(
        MatchSettings: CMatchSettings,
    ): Void;
    MatchSettings_ReloadFromFile(
        MatchSettings: CMatchSettings,
    ): Void;
    /**
     * Save a matchsettings to a new file.
     */
    MatchSettings_SaveAs(
        FilePath: Text,
        MatchSettings: CMatchSettings,
    ): CMatchSettings;
    MatchSettings_EditScriptSettings(
        MatchSettings: CMatchSettings,
    ): Void;
    MatchSettings_EditScriptSettings_Ongoing: Boolean;
    /**
     * Remove a matchsetting file (or only the matchsetting for temp ones).
     */
    MatchSettings_Remove(
        MatchSettings: CMatchSettings,
    ): Void;
    /**
     * Array of the matchsettings
     */
    MatchSettings: Array<CMatchSettings>;
    MatchSettings_File: Array<CMatchSettings>;
    MatchSettings_Temp: Array<CMatchSettings>;
}
/**
 * Documentation for class CVoiceChatConfig
 */
export interface CVoiceChatConfig {
    NewRemoteUser_DefaultMuteSetting: CGameUserVoiceChat__EMuteSetting;
    SyncMode: CVoiceChatConfig__ESyncMode;
    Manual_Channel: Text;
    Manual_ClearUsers(): Void;
    Manual_UserAdd_Proc(
        WebServicesUserId: Text,
    ): CGameUserVoiceChat;
}
export interface CMapEditorPluginEvent extends Omit<CManiaAppEvent, 'Type'> {
    Type: CMapEditorPluginEvent__Type;
    Input: CMapEditorPluginEvent__EInput;
    EditedAnchorDataId: Ident;
    IsFromPad: Boolean;
    IsFromMouse: Boolean;
    IsFromKeyboard: Boolean;
    OnlyScriptMetadataModified: Boolean;
    MapSavedOrSaveCancelled: Boolean;
}
export interface CMacroblockInstance extends CNod {
    MacroblockModel: CMacroblockModel;
    ClipList: CBlockClipList;
    Dir: CMapEditorPlugin__CardinalDirections;
    Coord: Int3;
    Order: Integer;
    UserData: Integer;
    UnitCoords: Array<Int3>;
    Color: CMapEditorPlugin__MapElemColor;
    ForceMacroblockColor: Boolean;
    GetSize(): Int3;
}
export interface CMapEditorInventory extends CNod {
    CurrentRootNode: CMapEditorInventoryDirectory;
    CurrentDirectory: CMapEditorInventoryDirectory;
    CurrentSelectedNode: CMapEditorInventoryNode;
    RootNodes: Array<CMapEditorInventoryNode>;
    EnterDirectory(): Void;
    LeaveDirectory(): Void;
    SelectArticle(
        NodeArticle: CMapEditorInventoryArticle,
    ): Void;
    OpenDirectory(
        NodeDirectory: CMapEditorInventoryDirectory,
    ): Void;
    SelectNode(
        Node: CMapEditorInventoryNode,
    ): Void;
    OpenBrotherDirectory(
        NextOrElsePrevious: Boolean,
    ): Void;
    SelectBrotherArticle(
        NextOrElsePrevious: Boolean,
    ): Void;
    SelectBrotherNode(
        NextOrElsePrevious: Boolean,
    ): Void;
    GetDirectoryAfter(
        Node: CMapEditorInventoryNode,
    ): CMapEditorInventoryDirectory;
    GetDirectoryBefore(
        Node: CMapEditorInventoryNode,
    ): CMapEditorInventoryDirectory;
    GetArticleAfter(
        Node: CMapEditorInventoryNode,
    ): CMapEditorInventoryArticle;
    GetArticleBefore(
        Node: CMapEditorInventoryNode,
    ): CMapEditorInventoryArticle;
}
export interface CCollector extends CNod {
    Name: Text;
    PageName: Text;
    InterfaceNumber: Integer;
    Icon: CImage;
    SkinDirectory: Text;
}
export interface CBlockModel extends CCollector {
    Name: Text;
    IsRoad: Boolean;
    IsTerrain: Boolean;
    IsPodium: Boolean;
    WaypointType: CBlockModel__EWayPointType;
    NoRespawn: Boolean;
    IsClip: Boolean;
    VariantGround: CBlockModelVariantGround;
    VariantAir: CBlockModelVariantAir;
}
export interface CMacroblockModel extends CCollector {
    IsGround: Boolean;
    HasStart: Boolean;
    HasFinish: Boolean;
    HasCheckpoint: Boolean;
    HasMultilap: Boolean;
    GeneratedBlockModel: CBlockModel;
    ClearScriptMetadata(): Void;
    Name: Text;
}
export interface CBlock extends CNod {
    CanHaveAnchor: Boolean;
    UseDefaultAnchor(): Void;
    UseCustomAnchor(): Void;
    Coord: Int3;
    Dir: CMapEditorPlugin__CardinalDirections;
    Direction: CBlock__CardinalDirections;
    BlockUnits: Array<CBlockUnit>;
    BlockModel: CBlockModel;
    IsGhostBlock(): Boolean;
}
export interface CGameItemModel extends CCollector {
}
export interface CItemAnchor extends CNod {
    Position: Vec3;
    ItemModel: CGameItemModel;
}
export interface CAnchorData extends CNod {
    DefaultTag: Text;
    DefaultOrder: Integer;
    Tag: Text;
    Order: Integer;
    WaypointType: CAnchorData__EWaypointType;
    Position: Vec3;
}
export interface CBlockClipList extends CNod {
    Clips: Array<CBlockClip>;
    Size: Int3;
    SetClipListFromMacroblock(
        MacroBlockModel: CMacroblockModel,
        Coord: Int3,
        Dir: CMapEditorPlugin__CardinalDirections,
    ): Boolean;
    SetClipListFromMacroblock(
        MacroBlockModel: CMacroblockModel,
    ): Boolean;
    SetClipListFromBlock(
        BlockModel: CBlockModel,
        Coord: Int3,
        Dir: CMapEditorPlugin__CardinalDirections,
    ): Boolean;
    SetClipListFromBlock(
        BlockModel: CBlockModel,
    ): Boolean;
    CreateAndAddClip(
        Name: Text,
        Coord: Int3,
        Offset: Int3,
        Dir: CMapEditorPlugin__CardinalDirections,
        ClipId: Integer,
    ): Void;
    SetFromClipList(
        ClipList: CBlockClipList,
        Coord: Int3,
        Dir: CMapEditorPlugin__CardinalDirections,
    ): Boolean;
    RemoveClip(
        Clip: CBlockClip,
    ): Void;
    ClearClips(): Void;
    Destroy(): Void;
}
export interface CBlockClip extends CNod {
    Name: Text;
    Dir: CMapEditorPlugin__CardinalDirections;
    Coord: Int3;
    Offset: Int3;
    ClipId: Integer;
    GetConnectableCoord(): Int3;
}
export interface CMapEditorCamera extends CNod {
    ReleaseLock(): Void;
    CenterOnCursor(): Void;
    WatchStart(): Void;
    WatchClosestFinishLine(): Void;
    WatchClosestCheckpoint(): Void;
    WatchWholeMap(): Void;
    WatchCustomSelection(): Void;
    MoveToMapCenter(): Void;
    GetLock(): Boolean;
    CanUse(): Boolean;
    IgnoreCameraCollisions(
        IgnoreCameraCollisions: Boolean,
    ): Void;
    TurnH(
        Clockwise: Boolean,
    ): Void;
    TurnH(
        Clockwise: Boolean,
        HalfSteps: Boolean,
    ): Void;
    TurnH(
        Clockwise: Boolean,
        HalfSteps: Boolean,
        Smooth: Boolean,
    ): Void;
    TurnV(
        UpOrElseDown: Boolean,
    ): Void;
    TurnV(
        UpOrElseDown: Boolean,
        Smooth: Boolean,
    ): Void;
    Move(
        RelativeDir: CMapEditorPlugin__RelativeDirections,
    ): Void;
    FollowCursor(
        Follow: Boolean,
    ): Void;
    CenterOnCursor(
        Smooth: Boolean,
    ): Void;
    MoveToMapCenter(
        Smooth: Boolean,
    ): Void;
    Watch(
        Block: CBlock,
    ): Void;
    Watch(
        Block: CBlock,
        Smooth: Boolean,
    ): Void;
    Watch(
        Macroblock: CMacroblockInstance,
    ): Void;
    Watch(
        Macroblock: CMacroblockInstance,
        Smooth: Boolean,
    ): Void;
    Watch(
        Clip: CBlockClip,
    ): Void;
    Watch(
        Clip: CBlockClip,
        Smooth: Boolean,
    ): Void;
    WatchStart(
        Smooth: Boolean,
    ): Void;
    WatchClosestFinishLine(
        Smooth: Boolean,
    ): Void;
    WatchClosestCheckpoint(
        Smooth: Boolean,
    ): Void;
    WatchWholeMap(
        Smooth: Boolean,
    ): Void;
    WatchMacroblocks(
        UserData: Integer,
    ): Void;
    WatchMacroblocks(
        UserData: Integer,
        Smooth: Boolean,
    ): Void;
    ZoomIn(
        Loop: Boolean,
    ): Void;
    ZoomIn(
        Loop: Boolean,
        Smooth: Boolean,
    ): Void;
    ZoomOut(
        Loop: Boolean,
    ): Void;
    ZoomOut(
        Loop: Boolean,
        Smooth: Boolean,
    ): Void;
    Zoom(
        Level: CMapEditorCamera__EZoomLevel,
    ): Void;
    Zoom(
        Level: CMapEditorCamera__EZoomLevel,
        Smooth: Boolean,
    ): Void;
    Look(
        Direction: CMapEditorPlugin__CardinalDirections8,
    ): Void;
    Look(
        Direction: CMapEditorPlugin__CardinalDirections8,
        Smooth: Boolean,
    ): Void;
    Look(
        Direction: CMapEditorPlugin__CardinalDirections,
    ): Void;
    Look(
        Direction: CMapEditorPlugin__CardinalDirections,
        Smooth: Boolean,
    ): Void;
    SetVStep(
        Step: CMapEditorCamera__ECameraVStep,
    ): Void;
    WatchCustomSelection(
        WatchCustomSelection: Boolean,
    ): Void;
    ActivateScrollRotateMode(
        ActivateScrollRotateMode: Boolean,
    ): Void;
}
export interface CMapEditorCursor extends CNod {
    ReleaseLock(): Void;
    Coord: Int3;
    Dir: CMapEditorPlugin__CardinalDirections;
    BlockModel: CBlockModel;
    TerrainBlockModel: CBlockModel;
    MacroblockModel: CMacroblockModel;
    Brightness: Real;
    HideDirectionalArrow: Boolean;
    MoveToCameraTarget(): Void;
    ResetCustomRGB(): Void;
    GetLock(): Boolean;
    CanUse(): Boolean;
    Raise(): Boolean;
    Lower(): Boolean;
    FollowCameraTarget(
        Follow: Boolean,
    ): Void;
    Rotate(
        CWOrCCW: Boolean,
    ): Void;
    Move(
        CardinalDir: CMapEditorPlugin__CardinalDirections,
    ): Void;
    Move(
        CardinalDir8: CMapEditorPlugin__CardinalDirections8,
    ): Void;
    Move(
        RelativeDir: CMapEditorPlugin__RelativeDirections,
    ): Void;
    DisableMouseDetection(
        Disable: Boolean,
    ): Void;
    CanPlace(): Boolean;
    IsCustomRGBActivated(): Boolean;
    IsCurrentItemAnimated(): Boolean;
    CurrentMacroblockHasAnimatedItem(): Boolean;
    CurrentSelectionHasAnimatedItem(): Boolean;
    SetCustomRGB(
        Color: Vec3,
    ): Void;
}
export interface CMapEditorConnectResults extends CNod {
    CanPlace: Boolean;
    Coord: Int3;
    Dir: CMapEditorPlugin__CardinalDirections;
}
export interface CUIConfigMarker extends CNod {
    Type: CUIConfigMarker__EAnchorType;
    IsTurning: Boolean;
    ShowArmor: Boolean;
    Label: Text;
    Box: Vec3;
    Icon: Text;
    Color: Vec3;
    ImageUrl: Text;
    ManialinkFrameId: Text;
    DistMin: Real;
    /**
     * DistMax is not used to fade out the marker when spectating
     */
    DistMax: Real;
    MiniMapVisibility: CUIConfigMarker__EMiniMapVisibility;
    HudVisibility: CUIConfigMarker__EHudVisibility;
    /**
     * Hide the marker if it is on the current player.
     * Only if Type is EAnchorType::Player .
     */
    HideOnSelf: Boolean;
    Gauge: Real;
}
export interface CUIConfigEvent extends CBaseEvent {
    Type: CUIConfigEvent__EType;
    UI: CUIConfig;
    ModuleType: CUIConfigEvent__EModuleType;
    Param1: Text;
    Param2: Array<Text>;
    CustomEventLayer: CUILayer;
    CustomEventType: Text;
    CustomEventData: Array<Text>;
    ItemUrl: Text;
    Quantity: Integer;
}
export interface CServerInfo extends CNod {
    ServerName: Text;
    ServerLogin: Text;
    JoinLink: Text;
    Comment: Text;
    ServerVersionBuild: Text;
    PlayerCount: Integer;
    MaxPlayerCount: Integer;
    SpectatorCount: Integer;
    MaxSpectatorCount: Integer;
    PlayersLevelMin: Real;
    PlayersLevelAvg: Real;
    PlayersLevelMax: Real;
    ModeName: Text;
    LadderServerLimitMax: Real;
    LadderServerLimitMin: Real;
    PlayerNames: Array<Text>;
    ChallengeNames: Array<Text>;
    ChallengeIds: Array<Text>;
    NbChallenges: Integer;
    HasBuddies: Boolean;
    IsFavourite: Boolean;
    IsLobbyServer: Boolean;
    IsPrivate: Boolean;
    IsPrivateForSpectator: Boolean;
    IsMapDownloadAllowed: Boolean;
    IsTeamMode: Boolean;
    IsDisableChangeTeams: Boolean;
    SendToServerAfterMatchUrl: Text;
    ViewerCount: Integer;
}
export interface CXmlRpcEvent extends CBaseConstEvent {
    Type: CXmlRpcEvent__EType;
    Param1: Text;
    Param2: Text;
    ParamArray1: Text;
    ParamArray2: Array<Text>;
}
export interface CTmRaceResultNod extends CNod {
    Time: Integer;
    Score: Integer;
    NbRespawns: Integer;
    SpawnLandmarkId: Ident;
    Checkpoints: Array<Integer>;
    CheckpointLandmarkIds: Array<Ident>;
    Compare(
        Other: CTmRaceResultNod,
        Criteria: CTmRaceResultNod__ETmRaceResultCriteria,
    ): Integer;
}
export interface CModulePlaygroundHud extends CNod {
    Inventory: CModulePlaygroundInventory;
    Store: CModulePlaygroundStore;
    ScoresTable: CModulePlaygroundScoresTable;
    Chrono: CModulePlaygroundChrono;
    SpeedMeter: CModulePlaygroundSpeedMeter;
    PlayerState: CModulePlaygroundPlayerState;
    TeamState: CModulePlaygroundTeamState;
    Modules: Array<CModulePlayground>;
    SwitchContext(
        Player: CPlayer,
        ContextName: Text,
    ): Void;
    SetDefaultContext(
        Player: CPlayer,
    ): Void;
    RetrieveModuleId(
        ModuleName: Text,
    ): Ident;
}
export interface CWebServicesTaskResult_AccountTrophyGainList extends CTaskResult {
}
export interface CTaskResult_AccountTrophyGainList extends CWebServicesTaskResult_AccountTrophyGainList {
    /**
     * List of account trophy gain contained in this result.
     */
    AccountTrophyGainList: Array<CAccountTrophyGain>;
}
export interface CModeTurretManager extends CNod {
    MapTurrets_Reset(): Void;
    Turret_Create(
        ModelId: Ident,
        Position: Vec3,
        Direction: Vec3,
        Clan: Integer,
        OwnerPlayer: CPlayer,
    ): CModeTurret;
    Turret_CreateWithOwner(
        ModelId: Ident,
        Position: Vec3,
        Direction: Vec3,
        Up: Vec3,
        Clan: Integer,
        OwnerId: Ident,
    ): CModeTurret;
    Turret_CreateWithOwner(
        ModelId: Ident,
        Position: Vec3,
        Direction: Vec3,
        Up: Vec3,
        Clan: Integer,
        OwnerId: Ident,
        AutoAimOn: Boolean,
        AutoTriggerOn: Boolean,
    ): CModeTurret;
    Turret_GetPosition(
        Turret: CModeTurret,
    ): Vec3;
    Turret_Destroy(
        Turret: CModeTurret,
    ): Void;
    Turret_DestroyAll(): Void;
    Turret_Activate(
        Turret: CModeTurret,
    ): Void;
    Turret_Deactivate(
        Turret: CModeTurret,
    ): Void;
    Turret_SetIsAutomatic(
        Turret: CModeTurret,
        IsAuto: Boolean,
    ): Void;
    Turret_Auto_SetAimAnticipation(
        Turret: CModeTurret,
        AimAnticipationMs: Real,
    ): Void;
    Turret_Auto_SetFirePeriod(
        Turret: CModeTurret,
        FirePeriodMs: Integer,
    ): Void;
    Turret_Auto_SetTargetDetectionFov(
        Turret: CModeTurret,
        DectectionFOVDeg: Real,
    ): Void;
    Turret_Auto_SetTargetDetectionRadius(
        Turret: CModeTurret,
        DetectionRadius: Real,
    ): Void;
    Turret_Manual_SetTargetPos(
        Turret: CModeTurret,
        TargetPos: Vec3,
    ): Void;
    Turret_Manual_Fire(
        Turret: CModeTurret,
    ): Void;
    Turrets: Array<CModeTurret>;
}
export interface CModeVehicleManager extends CNod {
    MapVehicles_Reset(): Void;
    DestroyAllVehicles(): Void;
    Vehicle_Create(
        ModelId: Ident,
        Clan: Integer,
        Armor: Integer,
        ArmorUse: CModeVehicleManager__EArmorUse,
        Spawn: CMapSpawn,
    ): CModeVehicle;
    Vehicle_Create(
        ModelId: Ident,
        Offset: Vec3,
        Armor: Integer,
        ArmorUse: CModeVehicleManager__EArmorUse,
        Owner: CModeVehicle,
    ): CModeVehicle;
    Vehicle_Destroy(
        Vehicle: CModeVehicle,
    ): Void;
    Vehicle_Assign_AutoPilot(
        Vehicle: CModeVehicle,
        ModelName: Text,
    ): Void;
    Vehicle_Assign_AutoPilot(
        Vehicle: CModeVehicle,
        ModelName: Text,
        LoopPath: Boolean,
    ): Void;
    Vehicle_SetTrailVisible(
        Vehicle: CModeVehicle,
        IsVisible: Boolean,
    ): Void;
    Vehicle_SetShieldVisible(
        Vehicle: CModeVehicle,
        IsVisible: Boolean,
    ): Void;
    VehicleModel_GetSlotsCount(
        ModelId: Ident,
        SlotType: CModeVehicleManager__ESlotType,
    ): Integer;
    Vehicles: Array<CModeVehicle>;
}
export interface CActionManager extends CNod {
    Action_GetState(
        Player: CPlayer,
        Slot: CActionManager__EActionSlot,
    ): CActionInterface;
    Action_GetState(
        Vehicle: CModeVehicle,
        VehicleSlotIndex: Integer,
        Slot: CActionManager__EActionSlot,
    ): CActionInterface;
    Action_GetState(
        Turret: CModeTurret,
        Slot: CActionManager__EActionSlot,
    ): CActionInterface;
    Actions: Array<CActionInterface>;
}
export interface CWebServicesTaskResult_GhostDriver_UploadLimits extends CTaskResult {
    Limits: Array<SWebServicesTaskResult_GhostDriver_UploadLimit>;
}
export interface CWebServicesTaskResult_GhostDriver_Download extends CTaskResult {
    Teams: Array<SWebServicesTaskResult_GhostDriver_Download_Team>;
}
export interface CSmPlayerDriver extends CNod {
    Behaviour: CSmPlayerDriver__ESmDriverBehaviour;
    PursueTarget: Boolean;
    AggroRadius: Real;
    ShootRadius: Real;
    TargetMinDistance: Real;
    DisengageDistance: Real;
    PathSpeedCoef: Real;
    Accuracy: Real;
    ReactionTime: Integer;
    ShootPeriodMin: Integer;
    ShootPeriodMax: Integer;
    RocketAnticipation: Boolean;
    /**
     * The field of view angle the driver uses to search for targets. Value in degrees.Values in range (0.000000-360.000000)
     */
    TargetDetectionFov: Real;
    AttackFilter: CSmPlayerDriver__ESmAttackFilter;
    Target: CSmPlayer;
    IsStuck: Boolean;
    /**
     * PathFinding takes some time to compute and doesn't always reach the intended goal. The player will most probably reach the goal in the case CSmPlayerDriver::ESmDriverPathState::Full.
     */
    PathState: CSmPlayerDriver__ESmDriverPathState;
    Owner: CSmPlayer;
    Scripted_Move(
        Goal: Vec3,
    ): Void;
    Scripted_MoveDelta(
        Delta: Vec3,
    ): Void;
    Scripted_MoveAndAim(
        Goal: Vec3,
    ): Void;
    Scripted_MoveDeltaAndAim(
        Delta: Vec3,
    ): Void;
    Scripted_Aim(
        Goal: Vec3,
    ): Void;
    Scripted_AimDelta(
        DeltaYaw: Real,
        DeltaPitch: Real,
    ): Void;
    /**
     * Same as Scripted_RequestInput(CSmMode::EActionInput::Movement).
     */
    Scripted_RequestAction(): Void;
    /**
     * Same as Scripted_RequestInput(CSmMode::EActionInput::Weapon). This has no effect when ForcedTarget is not Null.
     */
    Scripted_RequestGunTrigger(): Void;
    Scripted_RequestInput(
        Input: CSmMode__EActionInput,
    ): Void;
    Patrol_Mode: CSmPlayerDriver__ESmDriverPatrolMode;
    Patrol_Path: CMapBotPath;
    /**
     * Note that CSmMode::SpawnPlayer and CSmMode::SpawnBotPlayer may reset this value to the spawn position.
     */
    Escape_AnchorPoint: Vec3;
    Escape_DistanceSafe: Real;
    Escape_DistanceMinEscape: Real;
    Escape_DistanceMaxEscape: Real;
    /**
     * Note that CSmMode::SpawnPlayer and CSmMode::SpawnBotPlayer may reset this value to the spawn position.
     */
    Saunter_AnchorPoint: Vec3;
    Saunter_BaseChillingTime: Integer;
    Saunter_ChillingTimeDelta: Integer;
    Saunter_Radius: Real;
    /**
     * Note that CSmMode::SpawnPlayer and CSmMode::SpawnBotPlayer may reset this value to the spawn position.
     */
    Orbit_AnchorPoint: Vec3;
    Orbit_Radius: Real;
    Orbit_IsClockWise: Boolean;
    Scripted_ForceAimInMoveDir: Boolean;
    Follow_Offset: Vec3;
    Follow_ForceAimInLeaderDir: Boolean;
    Follow_HasLeader: Boolean;
    Follow_Leader: CSmPlayer;
    Follow_AnchorPoint: Vec3;
    ForcedTarget: CSmPlayer;
    TargetsToAvoid: Array<CSmPlayer>;
    PredictJump: Boolean;
    UsePathFinding: Boolean;
    OnStuckInput: CSmMode__EActionInput;
    MaxPathDivergence: Real;
    /**
     * If larger than 0.0, this bot can attack destructible parts of the world.
     */
    TargetWorldRadius: Real;
    /**
     * How much the driver value attacking the world rather than players. 0.0 for players only, 1.0 for world only, 0.5 for no preference.Values in range (0.000000-1.000000)
     */
    TargetWorldPriority: Real;
    /**
     * How long the driver will try to chase its target after it can't see it, 0 to disable.
     */
    LostTargetChaseDuration: Integer;
    /**
     * Flocking is a work in progress.
     * You need to fill this array and define a default behaviour for each member of the flock.
     */
    FlockPartners: Array<CSmPlayerDriver>;
    /**
     * Flocking is a work in progress.
     * How far the driver see its neighbours.
     */
    FlockRadius: Real;
    /**
     * Flocking is a work in progress.
     * The field of view angle the driver uses to see its neighbours. Value in degrees.Values in range (0.000000-360.000000)
     */
    FlockFov: Real;
    /**
     * Flocking is a work in progress.
     * How much the driver values going towards its neighbours.
     */
    FlockCohesionWeight: Real;
    /**
     * Flocking is a work in progress.
     * How much the driver values going the same direction as its neighbours.
     */
    FlockAlignmentWeight: Real;
    /**
     * Flocking is a work in progress.
     * How much the driver values not hitting its neighbours.
     */
    FlockSeparationWeight: Real;
}
export interface CSmMapGate extends CNod {
    Clan: Integer;
    Automatic: Boolean;
    ManualClosed: Boolean;
    AutoClosed: Boolean;
    AutoIsActive: Boolean;
    AutoCloseDelay: Integer;
    AutoOpenSpeed: Integer;
}
export interface CSmMapGauge extends CNod {
    Clan: Integer;
    /**
     * Values in range (0.000000-1.000000)
     */
    ValueReal: Real;
    Value: Integer;
    Max: Integer;
    Speed: Integer;
    Captured: Boolean;
}
export interface CMapObjectAnchor extends CNod {
    ItemName: Text;
    ItemModelId: Ident;
}
export interface CPlaygroundClient extends CNod {
    /**
     * Null when no map loaded.
     */
    Map: CMap;
    GameTime: Integer;
    LocalUser: CUser;
    UI: CUIConfig;
    ServerInfo: CServerInfo;
    SettingsPlayerModelId: Ident;
    HasPodium: Boolean;
    /**
     * Is in spectator mode - may be only for a short time between rounds.
     */
    IsSpectator: Boolean;
    /**
     * Client actually desires to spectate instead of playing.
     */
    IsSpectatorClient: Boolean;
    UseClans: Boolean;
    UseForcedClans: Boolean;
    IsLoadingScreen: Boolean;
    IsServerOrSolo: Boolean;
    QuitServer(
        Silent: Boolean,
    ): Void;
    QuitServerAndSetResult(
        Silent: Boolean,
        Type: Text,
        Data: Array<Text>,
    ): Void;
    IsInGameMenuDisplayed: Boolean;
    JoinTeam1(): Void;
    JoinTeam2(): Void;
    Teams: Array<CTeam>;
    /**
     * Request change of IsSpectatorClient (not immediate, and it may be refused). Caveat: will not set Request_Success
     */
    RequestSpectatorClient(
        Spectator: Boolean,
    ): Void;
    SetSpectateTarget(
        Player: Text,
    ): Void;
    ShowProfile(
        Player: Text,
    ): Void;
    /**
     * Save the current replay to a file. Filename is optional.
     */
    SaveReplay(
        FileName: Text,
    ): Boolean;
    SavePrevReplay(
        FileName: Text,
    ): Boolean;
    /**
     * Save the current map to a file (if the server IsMapDownloadAllowed). Filename is optional.
     */
    SaveMap(
        FileName: Text,
    ): Boolean;
    MapList_Request(): Void;
    GetSpectatorCameraType(): CPlaygroundClient__ESpectatorCameraType;
    GetSpectatorTargetType(): CPlaygroundClient__ESpectatorTargetType;
    SetWantedSpectatorCameraType(
        CameraType: CPlaygroundClient__ESpectatorCameraType,
    ): Void;
    MapList_IsInProgress: Boolean;
    MapList_Names: Array<Text>;
    MapList_MapUids: Array<Text>;
    Request_IsInProgress: Boolean;
    Request_Success: Boolean;
    RequestRestartMap(): Void;
    RequestNextMap(): Void;
    RequestGotoMap(
        MapUid: Text,
    ): Void;
    RequestSetNextMap(
        MapUid: Text,
    ): Void;
    RequestAutoTeamBalance(): Void;
    /**
     * Change some settings from the mode with new values. No need to include unchanged settings.  ex: '&lt;script_settings&gt;&lt;setting name="S_TimeLimit" type="integer" value="300"/&gt;&lt;script_settings/&gt;'
     * nb: you can use TriggerPageAction('maniaplanet:editsettings'); to use the legacy UI.
     */
    RequestChangeModeScriptSettings(
        SettingsXml: Text,
    ): Void;
    Vote_Question: Text;
    Vote_CanVote: Boolean;
    Vote_Cast(
        Answer: Boolean,
    ): Void;
}
export interface CManiaAppPlaygroundCommon extends CManiaApp {
    PendingEvents: Array<CManiaAppPlaygroundEvent>;
    Playground: CPlaygroundClient;
    Map: CMap;
    GhostMgr: CGhostManager;
    /**
     * (read-only) UI actually displayed, as defined by the server.
     */
    UI: CUIConfig;
    /**
     * Locally accessible by the client script to locally override settings from the server.
     */
    ClientUI: CUIConfig;
    SplitScreenCount: Integer;
    /**
     * Set a layer to be displayed on a subscreen. ScreenNum: 0=global, 1,2.... = screen index.  Limitation: a local layer can only be one screen at a time.
     */
    SplitScreenAssignLayer(
        UILayer: CUILayer,
        ScreenNum: Integer,
    ): Void;
    VoiceChat: CVoiceChatConfig;
}
export interface CModuleMenuFileBrowser extends CModuleMenuComponent {
    HasFinished: Boolean;
    Selection: Array<Text>;
    SetFileType(
        FileType: CModuleMenuFileBrowser__EFileType,
    ): Void;
    SetFileAction(
        FileAction: CModuleMenuFileBrowser__EFileAction,
    ): Void;
}
export interface CModulePlaygroundTeamState extends CModulePlayground {
    Reset(
        Player: CPlayer,
    ): Void;
}
export interface CModulePlaygroundPlayerState extends CModulePlayground {
    Reset(
        Player: CPlayer,
    ): Void;
}
export interface CModulePlaygroundSpeedMeter extends CModulePlayground {
    Reset(
        Player: CPlayer,
    ): Void;
    SetGlobalScale(
        Scale: Real,
    ): Void;
    SetGaugeNumber(
        Number: Integer,
    ): Void;
    SetGaugeAngle(
        Angle: Real,
    ): Void;
    SetGaugeBGVisible(
        Visibility: Boolean,
    ): Void;
    SetSpeedLineVisible(
        Visibility: Boolean,
    ): Void;
    SetGaugeSpeedMax(
        Maximum: Real,
    ): Void;
    SetSpeedValueScale(
        Scale: Real,
    ): Void;
    SetSpeedUnitScale(
        Scale: Real,
    ): Void;
    SetFooterUnitVisible(
        Visibility: Boolean,
    ): Void;
    SetFooterLineVisible(
        Visibility: Boolean,
    ): Void;
    SetDistanceVisible(
        Visibility: Boolean,
    ): Void;
    SetDistanceFooterLineVisible(
        Visibility: Boolean,
    ): Void;
}
export interface CModulePlaygroundChrono extends CModulePlayground {
    StopChrono(): Void;
    StartChrono(): Void;
    Reset(): Void;
    Reset(
        Player: CPlayer,
    ): Void;
}
export interface CModulePlaygroundScoresTable extends CModulePlayground {
    SetFooterText(
        FooterText: Text,
    ): Void;
    ResetCustomColumns(
        Score: CScore,
    ): Void;
    ResetCustomColumns(): Void;
    Scores_Sort(
        SortOrder: CModulePlaygroundScoresTable__EScoreSortOrder,
    ): Void;
    SetColumnValue(
        Score: CScore,
        ColumnId: Text,
        ColumnValue: Text,
    ): Void;
    SetColumnValue(
        Score: CScore,
        ColumnId: Text,
        ColumnValue: Integer,
    ): Void;
    SetColumnValue(
        Score: CScore,
        ColumnId: Text,
        ColumnValue: Real,
    ): Void;
    SetColumnVisibility(
        Type: CModulePlaygroundScoresTable__EColumnType,
        Visibility: Boolean,
    ): Void;
    SetColumnVisibility(
        ColumnId: Text,
        Visibility: Boolean,
    ): Void;
    SetColor(
        Score: CScore,
        Color: Vec3,
    ): Void;
    ResetColor(
        Score: CScore,
    ): Void;
}
export interface CModulePlaygroundInventory extends CModulePlayground {
    AddItem(
        Player: CPlayer,
        Url: Text,
        Quantity: Integer,
    ): Integer;
    AddAction(
        Player: CPlayer,
        Url: Text,
    ): Boolean;
    RemoveInventoryItem(
        Player: CPlayer,
        Url: Text,
        Quantity: Integer,
    ): Integer;
    GetInventoryItemQuantity(
        Player: CPlayer,
        Url: Text,
    ): Integer;
    IsInventoryItemStored(
        Player: CPlayer,
        Url: Text,
    ): Boolean;
    GetStoredItemsList(
        Player: CPlayer,
    ): Array<Text>;
    GetStoredActionsList(
        Player: CPlayer,
    ): Array<Text>;
}
export interface CModulePlaygroundStore extends CModulePlayground {
    Reset(): Void;
    Reset(
        Player: CPlayer,
    ): Void;
    SetMoney(
        Player: CPlayer,
        Amount: Integer,
    ): Void;
    GetMoney(
        Player: CPlayer,
    ): Integer;
    AddMoney(
        Player: CPlayer,
        Amount: Integer,
    ): Boolean;
    SubMoney(
        Player: CPlayer,
        Amount: Integer,
    ): Boolean;
    SetActionLevel(
        Player: CPlayer,
        ActionUrl: Text,
        ActionLevel: Integer,
    ): Void;
    GetActionLevel(
        Player: CPlayer,
        ActionUrl: Text,
    ): Integer;
    SetItemCanBeBought(
        Player: CPlayer,
        ActionUrl: Text,
        CanBeBought: Boolean,
    ): Void;
    GetItemCanBeBought(
        Player: CPlayer,
        ActionUrl: Text,
    ): Boolean;
}
export interface CModuleMenuModel extends CNod {
    Pages: Array<CModuleMenuPageModel>;
    AddPage(
        PageUrl: Text,
    ): CModuleMenuPageModel;
    AddLink(
        ParentPage: CModuleMenuPageModel,
        ChildPage: CModuleMenuPageModel,
    ): Void;
    MenuScript: Text;
}
export interface CModuleMenuPageModel extends CNod {
    ManialinkText: Text;
}
export interface CModulePlaygroundHudModel extends CNod {
    ContextAdd(
        ContextName: Text,
    ): Ident;
    ContextSetId(
        ContextId: Ident,
        NewContextName: Text,
    ): Ident;
    ContextRemove(
        ContextId: Ident,
    ): Void;
    ContextsIds: Array<Ident>;
    SubModules: Array<CHudModule>;
    NewSubModule(
        ModulePath: Text,
    ): CHudModule;
    DeleteSubModule(
        SubModule: CHudModule,
    ): Void;
    SubModuleIsContextActive(
        SubModule: CHudModule,
        ContextId: Ident,
    ): Boolean;
    SubModuleSetContextIsActive(
        SubModule: CHudModule,
        ContextId: Ident,
        IsActive: Boolean,
    ): Void;
    EditorContextIndex: Integer;
}
export interface CEditorPluginModuleEvent extends Omit<CManiaAppEvent, 'Type'> {
    Type: CEditorPluginModuleEvent__Type;
    Eat(): Void;
}
export interface CImage extends CNod {
}
export interface CEditorEvent extends Omit<CManiaAppEvent, 'Type'> {
    Type: CEditorEvent__Type;
}
export interface CMediaTrackerClip extends CNod {
    Name: Text;
    Tracks: Array<CMediaTrackerTrack>;
    StopWhenRespawn: Boolean;
    StopWhenLeave: Boolean;
    TriggersBeforeRaceStart: Boolean;
}
export interface CMediaTrackerClipGroup extends CNod {
    Clips: Array<CMediaTrackerClip>;
}
export interface CMediaTrackerTrack extends CNod {
    Name: Text;
    Blocks: Array<CMediaTrackerBlock>;
}
export interface CMatchSettings extends CNod {
    /**
     * Name of the file
     */
    Name: Text;
    FileName: Text;
    ScriptModeName: Text;
    ScriptModeName_Check(
        ScriptModeName: Text,
    ): Boolean;
    ScriptModeName_Set(
        ScriptModeName: Text,
    ): Void;
    ScriptSettings_SetToDefault(): Void;
    Playlist: Array<CMatchSettingsPlaylistItem>;
    Playlist_FileExists(
        File: Text,
    ): Boolean;
    Playlist_FileMatchesMode(
        File: Text,
    ): Boolean;
    Playlist_Add(
        File: Text,
    ): Void;
    Playlist_Remove(
        Index: Integer,
    ): Void;
    Playlist_SwapUp(
        Index: Integer,
    ): Void;
    Playlist_SwapDown(
        Index: Integer,
    ): Void;
}
export interface CPackCreatorTitleInfo extends CNod {
    TitleId: Ident;
    MakerTitleId: Ident;
    DisplayName: Text;
    Description: Text;
    InfoUrl: Text;
    DownloadUrl: Text;
    TitleVersion: Text;
    AllowedClientTitleVersion: Text;
    BaseTitleIds: Text;
    ForcedPlayerModel: Text;
    Packaging_ImageFileName: Text;
    Packaging_LogosFileName: Text;
    Packaging_Group: Text;
    /**
     * Can be an http://url or a ./path/in/title/datas/station.app.txt
     */
    Station_ManialinkUrl: Text;
    Menus_BgReplayFileName: Text;
    Menus_ManiaAppFileName: Text;
    Menus_MusicFileName: Text;
    /**
     * Use  CGameManiaTitleEditionScriptAPI::SetTitleCampaign() to modify
     */
    Solo_HasCampaign: Boolean;
    FallbackFontFileName: Text;
    Hud3dFontFileName: Text;
    HudDefaultModuleScriptName: Text;
    MusicFolder: Text;
    Editor_MusicFileName: Text;
}
export interface CMlGraphCurve extends CNod {
    Points: Array<Vec2>;
    Color: Vec3;
    SortPoints(): Void;
    Style: Text;
    /**
     * Values in range (0.000000-50.000000)
     */
    Width: Real;
}
export interface CMlFileEntry extends CMlEntry {
    OnlyUserFiles: Boolean;
    ClearFileNames(): Void;
    FullFileName: Text;
    RelativeNameToRoot: Text;
    RelativeNameToTypeFolder: Text;
}
export interface CParsingNode extends CNod {
    Name: Text;
    TextContents: Text;
    TextRawContents: Text;
    TextRecursiveContents: Text;
    Children: Array<CParsingNode>;
    GetAttributeText(
        Name: Text,
        DefaultValue: Text,
    ): Text;
    GetAttributeInteger(
        Name: Text,
        DefaultValue: Integer,
    ): Integer;
    GetAttributeReal(
        Name: Text,
        DefaultValue: Real,
    ): Real;
    GetAttributeBoolean(
        Name: Text,
        DefaultValue: Boolean,
    ): Boolean;
    GetFirstChild(
        Name: Text,
    ): CParsingNode;
}
export interface CMapGroup extends CNod {
    IsUnlocked(): Void;
    MapInfos: Array<CMapInfo>;
}
export interface CNadeoServicesItemCollection extends CNod {
    ActivityId: Text;
    CreationTimeStamp: Integer;
    CreatorAccountId: Text;
    CreatorWebServicesUserId: Text;
    CreatorDisplayName: Text;
    CreatorIsFirstPartyDisplayName: Boolean;
    ClubId: Text;
    CurrentVersion: CNadeoServicesItemCollectionVersion;
    DisplayName: Text;
    HasVersionList: Boolean;
    Id: Text;
    IsCurrentVersionNull: Boolean;
    Name: Text;
    Type: Text;
    UpdateTimeStamp: Integer;
    VersionList: Array<CNadeoServicesItemCollectionVersion>;
}
export interface CNadeoServicesMap extends CNod {
    AuthorAccountId: Text;
    AuthorWebServicesUserId: Text;
    AuthorDisplayName: Text;
    AuthorIsFirstPartyDisplayName: Boolean;
    AuthorScore: Integer;
    BronzeScore: Integer;
    CollectionName: Text;
    CreatedWithGamepadEditor: Boolean;
    CreatedWithSimpleEditor: Boolean;
    FileName: Text;
    FileUrl: Text;
    GoldScore: Integer;
    Id: Text;
    IsPlayable: Boolean;
    Name: Text;
    SilverScore: Integer;
    Style: Text;
    SubmitterAccountId: Text;
    SubmitterWebServicesUserId: Text;
    ThumbnailUrl: Text;
    TimeStamp: Integer;
    Type: Text;
    Uid: Text;
}
export interface CNadeoServicesSkin extends CNod {
    Checksum: Text;
    CreatorAccountId: Text;
    CreatorWebServicesUserId: Text;
    CreatorDisplayName: Text;
    CreatorIsFirstPartyDisplayName: Boolean;
    DisplayName: Text;
    FileName: Text;
    FileUrl: Text;
    Id: Text;
    Name: Text;
    ThumbnailUrl: Text;
    TimeStamp: Integer;
    Type: Text;
}
export interface CReplayInfo extends CNod {
    MapUid: Text;
    Name: Text;
    Path: Text;
    FileName: Text;
}
export interface CTaskResult_ModeInfo extends CNod {
    /**
     * Name of the GameMode
     */
    Name: Text;
    Path: Text;
    Description: Text;
    Version: Text;
    CompatibleMapTypes: Array<Text>;
}
export interface CMapRecord extends CNod {
    AccountId: Text;
    WebServicesUserId: Text;
    MapId: Text;
    MapUid: Ident;
    ScopeType: Text;
    ScopeId: Text;
    GameMode: Text;
    GameModeCustomData: Text;
    Score: Integer;
    Time: Integer;
    RespawnCount: Integer;
    Timestamp: Integer;
    Medal: Integer;
    MultiAsyncLevel: Integer;
    SkillPoints: Integer;
    FileName: Text;
    ReplayUrl: Text;
}
export interface CHighScoreComparison extends CNod {
    MapInfo: CMapInfo;
    Login: Text;
    RecordScore: Integer;
    RecordTime: Integer;
    RecordRespawnCount: Integer;
    RecordDate: Integer;
    RecordDateString: Text;
    RecordElapsedTime: Integer;
    RecordCount: Integer;
    OpponentLogin: Text;
    OpponentDisplayName: Text;
    OpponentRecordUrl: Text;
    OpponentRecordScore: Integer;
    OpponentRecordTime: Integer;
    OpponentRecordRespawnCount: Integer;
    OpponentRecordDate: Integer;
    OpponentRecordDateString: Text;
    OpponentRecordElapsedTime: Integer;
    OpponentRecordCount: Integer;
}
export interface CHighScoreComparisonSummary extends CNod {
    Login: Text;
    BestRecordCount: Integer;
    BestRecordLastDate: Integer;
    BestRecordLastDateString: Text;
    BestRecordElapsedTime: Integer;
    OpponentLogin: Text;
    OpponentDisplayName: Text;
    OpponentBestRecordCount: Integer;
    OpponentBestRecordLastDate: Integer;
    OpponentBestRecordLastDateString: Text;
    OpponentBestRecordElapsedTime: Integer;
}
export interface CNaturalLeaderBoardInfo extends CNod {
    /**
     * Rank.
     */
    Rank: Integer;
    /**
     * UserId.
     */
    UserId: Ident;
    /**
     * Login.
     */
    Login: Text;
    /**
     * Display name.
     */
    DisplayName: Text;
    /**
     * Is display name from first party.
     */
    IsFirstPartyDisplayName: Boolean;
    /**
     * Score.
     */
    Score: Integer;
    /**
     * FileName.
     */
    FileName: Text;
    /**
     * ReplayUrl.
     */
    ReplayUrl: Text;
}
export interface CSeason extends CNod {
    CreatorAccountId: Text;
    CreatorWebServicesUserId: Text;
    GameMode: Text;
    GameModeCustomData: Text;
    MapRecordType: Text;
    Id: Text;
    Name: Text;
    CreationTimeStamp: Integer;
    StartTimeStamp: Integer;
    EndTimeStamp: Integer;
    MapInfoList: Array<CSeasonMapInfo>;
}
export interface CRealLeaderBoardInfo extends CNod {
    /**
     * Rank.
     */
    Rank: Integer;
    /**
     * UserId.
     */
    UserId: Ident;
    /**
     * Login.
     */
    Login: Text;
    /**
     * Display name.
     */
    DisplayName: Text;
    /**
     * Is display name from first party.
     */
    IsFirstPartyDisplayName: Boolean;
    /**
     * Score.
     */
    Score: Real;
    /**
     * FileName.
     */
    FileName: Text;
    /**
     * ReplayUrl.
     */
    ReplayUrl: Text;
}
export interface CAccountTrophyLastYearSummary extends CNod {
    AccountId: Text;
    WebServicesUserId: Text;
    T1Count: Integer;
    T2Count: Integer;
    T3Count: Integer;
    T4Count: Integer;
    T5Count: Integer;
    T6Count: Integer;
    T7Count: Integer;
    T8Count: Integer;
    T9Count: Integer;
    TimeStamp: Integer;
}
export interface CTrophySoloMedalAchievementSettings extends CNod {
    Type: Text;
    AllBronzeLevelSettings: CTrophySoloMedalAchievementLevelSettings;
    AllSilverLevelSettings: CTrophySoloMedalAchievementLevelSettings;
    AllGoldLevelSettings: CTrophySoloMedalAchievementLevelSettings;
    AllAuthorLevelSettings: CTrophySoloMedalAchievementLevelSettings;
}
export interface CZone extends CNod {
    Id: Text;
    Name: Text;
    ParentId: Text;
    Path: Text;
    FullPath: Text;
    FlagUrl: Text;
    CountryFlagUrl: Text;
    Model_CarSport_SkinName: Text;
    Model_CarSport_SkinUrl: Text;
    Model_CharacterPilot_SkinName: Text;
    Model_CharacterPilot_SkinUrl: Text;
}
export interface CVehicleSettings extends CNod {
    ModelDisplayName: Text;
    ModelName: Text;
    /**
     * ....
     */
    SkinName: Text;
    SkinUrl: Text;
    /**
     * actual range is [1.0..10.0]Values in range (0.100000-10.000000)
     */
    AnalogSensitivity: Real;
    /**
     * Values in range (0.000000-0.900000)
     */
    AnalogDeadZone: Real;
    InvertSteer: Boolean;
    AccelIsToggleMode: Boolean;
    BrakeIsToggleMode: Boolean;
    /**
     * Values in range (0.000000-2.000000)
     */
    RumbleIntensity: Real;
    HapticFeedbackEnabled: Boolean;
    /**
     * Values in range (0.000000-1.000000)
     */
    CenterSpringIntensity: Real;
}
export interface CFriend extends CNod {
    AccountId: Text;
    CountryFlagUrl: Text;
    DisplayName: Text;
    IsFirstPartyDisplayName: Boolean;
    PlatformType: Text;
    Presence: Text;
    Relationship: Text;
    WebServicesUserId: Text;
}
export interface CNews extends CNod {
    Id: Text;
    Type: Text;
    Placement: Text;
    Locale: Text;
    Title: Text;
    Body: Text;
    MediaUrl: Text;
    MediaType: Text;
    PublicationDate: Text;
    Priority: Integer;
    DisplayTime: Integer;
    LinkList: Array<CNewsLink>;
}
export interface CUserPrestige extends CNod {
    CategoryType: Text;
    CategoryLevel: Integer;
    Mode: NWebServicesPrestige.EPrestigeMode;
    PrestigeId: Text;
    PrestigeLevel: Integer;
    SkinOptions: Text;
    TimeStamp: Integer;
    Year: Integer;
}
export interface CPrestige extends CNod {
    CategoryType: Text;
    CategoryLevel: Integer;
    IsUnlocked: Boolean;
    Mode: NWebServicesPrestige.EPrestigeMode;
    PrestigeId: Text;
    PrestigeLevel: Integer;
    RewardDisplayName: Text;
    RewardFileUrl: Text;
    RewardThumbnailUrl: Text;
    RewardType: Text;
    SkinOptions: Text;
    StatCurrentValue: Integer;
    StatValueForNextLevel: Integer;
    TimeStamp: Integer;
    Year: Integer;
}
export interface CSquad extends CNod {
    CreationTimeStamp: Integer;
    LeaderAccountId: Text;
    LeaderWebServicesUserId: Text;
    Id: Text;
    IsLocked: Boolean;
    Name: Text;
    Size: Integer;
    Type: Text;
    UpdateTimeStamp: Integer;
    InvitationList: Array<CSquadInvitation>;
    MemberList: Array<CSquadMember>;
}
export interface CPackCreator extends CNod {
    /**
     * Register (or retreive) a package for the currently edited title.
     */
    RegisterPackForEditedTitle(): Void;
    RegisterPack_IsInProgess: Boolean;
    CurrentPack: CPackCreatorPack;
    /**
     * Start a new build for a pack, optionnaly a titlepack.
     */
    Build_Begin(
        Pack: CPackCreatorPack,
        TitleInfo: CPackCreatorTitleInfo,
    ): Ident;
    Build_AddFile(
        BuildId: Ident,
        FileName: Text,
    ): Void;
    Build_AddFolder(
        BuildId: Ident,
        FolderName: Text,
    ): Void;
    Build_AddFile(
        BuildId: Ident,
        FileName: Text,
        IsPublic: Boolean,
        IsInternal: Boolean,
        NoAutomaticDeps: Boolean,
    ): Void;
    Build_AddFolder(
        BuildId: Ident,
        FolderName: Text,
        IsPublic: Boolean,
        IsInternal: Boolean,
        NoRecursion: Boolean,
        NoAutomaticDeps: Boolean,
    ): Void;
    Build_Generate(
        BuildId: Ident,
        Upload: Boolean,
    ): Void;
    Build_IsGenerated(
        BuildId: Ident,
    ): Boolean;
    Build_ErrorMessage(
        BuildId: Ident,
    ): Text;
    Build_End(
        BuildId: Ident,
    ): Void;
}
export interface CNotificationsConsumerEvent extends CNod {
    /**
     * Type of the event.
     */
    Type: CNotificationsConsumerEvent__EType;
    /**
     * Notification concerned by the event.
     */
    Notification: CNotificationsConsumerNotification;
}
export interface CNotificationsConsumerNotification extends CNod {
    Title: Text;
    Description: Text;
    ImageUrl: Text;
    Priority: CNotificationsConsumerNotification__ENotificationPriority;
    HasBeenRead: Boolean;
    HasBeenActivated: Boolean;
    /**
     * The user has been displayed the Notification for a sufficient time.
     */
    SetRead(): Void;
    /**
     * The user has clicked on the Notification.
     */
    SetActivated(): Void;
}
export interface CMapEditorInventoryNode extends CNod {
    NodeName: Text;
    IsDirectory: Boolean;
    ParentNode: CMapEditorInventoryDirectory;
    GetCollectorNod(): CNod;
}
export interface CMapEditorInventoryDirectory extends CMapEditorInventoryNode {
    Children: Array<CMapEditorInventoryNode>;
    HasChildDirectory: Boolean;
    HasChildArticle: Boolean;
}
export interface CMapEditorInventoryArticle extends CMapEditorInventoryNode {
}
export interface CBlockModelVariant extends CNod {
    Name: Text;
    IsAllUnderground: Boolean;
    IsPartUnderground: Boolean;
    Size: Int3;
    OffsetBoundingBoxMin: Int3;
    OffsetBoundingBoxMax: Int3;
    BlockUnitModels: Array<CBlockUnitModel>;
}
export interface CBlockModelVariantGround extends CBlockModelVariant {
}
export interface CBlockModelVariantAir extends CBlockModelVariant {
}
export interface CBlockUnit extends CNod {
    AbsoluteOffset: Int3;
    BlockUnitModel: CBlockUnitModel;
    Block: CBlock;
}
export interface CMapSector extends CNod {
    PlayersIds: Array<Ident>;
    Tag: Text;
}
export interface CActionInterface extends CNod {
    Cooldown: Integer;
    CooldownStartTime: Integer;
    Energy: Integer;
    EnergyCost: Integer;
    EnergyMax: Integer;
}
/**
 * Documentation for class SWebServicesTaskResult_GhostDriver_UploadLimit
 */
export interface SWebServicesTaskResult_GhostDriver_UploadLimit {
    TeamLevel: Integer;
    Limit: Integer;
}
/**
 * Documentation for class SWebServicesTaskResult_GhostDriver_Download_Team
 */
export interface SWebServicesTaskResult_GhostDriver_Download_Team {
    TeamLevel: Integer;
    Members: Array<SWebServicesTaskResult_GhostDriver_Download_Member>;
}
export interface CManiaAppPlayground extends CManiaAppPlaygroundCommon {
    /**
     * Send a custom event to the CMode script.
     */
    SendCustomEvent(
        Type: Text,
        Data: Array<Text>,
    ): Void;
    HoldLoadingScreen: Boolean;
}
export interface CManiaAppPlaygroundEvent extends Omit<CManiaAppEvent, 'Type'> {
    PlaygroundType: CManiaAppPlaygroundEvent__Type;
    PlaygroundScriptEventType: Text;
    PlaygroundScriptEventData: Array<Text>;
    Ghost: CGhost;
    GameplaySpecialType: CManiaAppPlaygroundEvent__GameplaySpecialType;
    GameplayTurboRoulette: CManiaAppPlaygroundEvent__GameplayTurboRoulette;
    IsBoostUpElseDown: Boolean;
    WaypointLandmarkIndex: Integer;
    RaceWaypointTime: Integer;
    DiffWithBestRace: Integer;
    DiffWithBestRace_IsValid: Boolean;
    LapWaypointTime: Integer;
    DiffWithBestLap: Integer;
    DiffWithBestLap_IsValid: Boolean;
    IsFinish: Boolean;
    IsNewLap: Boolean;
    RaceWaypointCount: Integer;
    LapWaypointCount: Integer;
}
export interface CHudModule extends CNod {
    ModuleName: Text;
    PosX: Real;
    PosY: Real;
    ZIndex: Real;
    Scale: Real;
    ModulePath: Text;
}
export interface CMediaTrackerBlock extends CNod {
    Start: Real;
    End: Real;
    GetKeyTime(
        KeyIndex: Integer,
    ): Real;
    GetKeysCount(): Integer;
}
export interface CMatchSettingsPlaylistItem extends CNod {
    /**
     * Name of the map
     */
    Name: Text;
    /**
     * True if the file is found
     */
    FileExists: Boolean;
}
export interface CNadeoServicesItemCollectionVersion extends CNod {
    Checksum: Text;
    CreationTimeStamp: Integer;
    Id: Text;
    UpdateTimeStamp: Integer;
    Url: Text;
}
export interface CSeasonMapInfo extends CNod {
    MapId: Text;
    MapUid: Ident;
    BronzeScore: Integer;
    SilverScore: Integer;
    GoldScore: Integer;
    AuthorScore: Integer;
    TimeStamp: Integer;
}
export interface CTrophySoloMedalAchievementLevelSettings extends CNod {
    Level: Text;
    T1Count: Integer;
    T2Count: Integer;
    T3Count: Integer;
    T4Count: Integer;
    T5Count: Integer;
    T6Count: Integer;
    T7Count: Integer;
    T8Count: Integer;
    T9Count: Integer;
}
export interface CNewsLink extends CNod {
    Type: Text;
    Param: Text;
    ActionName: Text;
    ActionDescription: Text;
}
export interface CSquadInvitation extends CNod {
    AccountId: Text;
    CountryFlagUrl: Text;
    DisplayName: Text;
    IsFirstPartyDisplayName: Boolean;
    PrestigeSkinOptions: Text;
    SkinList: Array<CSkinInfo>;
}
export interface CSquadMember extends CNod {
    AccountId: Text;
    CountryFlagUrl: Text;
    DisplayName: Text;
    IsFirstPartyDisplayName: Boolean;
    PrestigeSkinOptions: Text;
    SkinList: Array<CSkinInfo>;
}
export interface CPackCreatorPack extends CNod {
    /**
     * PackId is the TitleId if the pack is a TitlePack.
     */
    PackId: Ident;
    CreatorId: Ident;
    IsTitlePack: Boolean;
    Recipients_Add(
        Login: Text,
        UseCost: Integer,
        GetCost: Integer,
    ): Void;
    Recipients_Remove(
        Login: Text,
    ): Void;
    Recipients: Array<CPackCreatorRecipient>;
}
export interface CBlockUnitModel extends CNod {
    RelativeOffset: Int3;
    Clips: Array<CBlockModelClip>;
}
/**
 * Documentation for class SWebServicesTaskResult_GhostDriver_Download_Member
 */
export interface SWebServicesTaskResult_GhostDriver_Download_Member {
    Ghosts: Array<SWebServicesTaskResult_GhostDriver_Download_Ghost>;
}
export interface CPackCreatorRecipient extends CNod {
    /**
     * Login of the recipient.
     */
    Login: Text;
    /**
     * Cost to read the data (and see it ingame).
     */
    GetCost: Integer;
    /**
     * Cost to use the in other creations.
     */
    UseCost: Integer;
}
export interface CBlockModelClip extends CBlockModel {
}
/**
 * Documentation for class SWebServicesTaskResult_GhostDriver_Download_Ghost
 */
export interface SWebServicesTaskResult_GhostDriver_Download_Ghost {
    Ghost: CGhost;
}
/**
 * Standard mathematical operations, angles are in radians unless specified.
 */
export namespace MathLib {
    export declare function Abs(
        _Argument1: Integer,
    ): Integer;
    export declare function Abs(
        _Argument1: Real,
    ): Real;
    export declare function ToReal(
        _Argument1: Integer,
    ): Real;
    /**
     * Converts an angle from degrees to radians.
     */
    export declare function DegToRad(
        _Degree: Real,
    ): Real;
    /**
     * Converts an angle from radians to degrees.
     */
    export declare function RadToDeg(
        _Radian: Real,
    ): Real;
    export declare function Sin(
        _Argument1: Real,
    ): Real;
    export declare function Cos(
        _Argument1: Real,
    ): Real;
    export declare function Tan(
        _Argument1: Real,
    ): Real;
    export declare function Atan2(
        _Argument1: Real,
        _Argument2: Real,
    ): Real;
    export declare function Exp(
        _Argument1: Real,
    ): Real;
    export declare function Rand(
        _Argument1: Real,
        _Argument2: Real,
    ): Real;
    export declare function Rand(
        _Argument1: Real,
        _Argument2: Real,
        _Argument3: Integer,
    ): Real;
    export declare function Rand(
        _Argument1: Integer,
        _Argument2: Integer,
    ): Integer;
    export declare function Rand(
        _Argument1: Integer,
        _Argument2: Integer,
        _Argument3: Integer,
    ): Integer;
    export declare function NearestReal(
        _Argument1: Integer,
    ): Real;
    export declare function NearestInteger(
        _Argument1: Real,
    ): Integer;
    export declare function FloorInteger(
        _Argument1: Real,
    ): Integer;
    export declare function TruncInteger(
        _Argument1: Real,
    ): Integer;
    export declare function CeilingInteger(
        _Argument1: Real,
    ): Integer;
    export declare function Distance(
        _Argument1: Real,
        _Argument2: Real,
    ): Real;
    /**
     * Euclidian distance between two 2d points.
     */
    export declare function Distance(
        _Argument1: Vec2,
        _Argument2: Vec2,
    ): Real;
    /**
     * Euclidian distance between two 3d points.
     */
    export declare function Distance(
        _Argument1: Vec3,
        _Argument2: Vec3,
    ): Real;
    /**
     * Euclidian norm of the vector.
     */
    export declare function Length(
        _Argument1: Vec2,
    ): Real;
    /**
     * Euclidian norm of the vector.
     */
    export declare function Length(
        _Argument1: Vec3,
    ): Real;
    /**
     * Returns maximum of the absolute value of each component.
     */
    export declare function Norm0(
        _Argument1: Vec2,
    ): Real;
    /**
     * Returns the sum of the absolute value of each component.
     */
    export declare function Norm1(
        _Argument1: Vec2,
    ): Real;
    /**
     * Returns maximum of the absolute value of each component.
     */
    export declare function Norm0(
        _Argument1: Vec3,
    ): Real;
    /**
     * Returns the sum of the absolute value of each component.
     */
    export declare function Norm1(
        _Argument1: Vec3,
    ): Real;
    /**
     * Returns maximum of the absolute value of each component.
     */
    export declare function Norm0(
        _Argument1: Int2,
    ): Integer;
    /**
     * Returns the sum of the absolute value of each component.
     */
    export declare function Norm1(
        _Argument1: Int2,
    ): Integer;
    /**
     * Returns maximum of the absolute value of each component.
     */
    export declare function Norm0(
        _Argument1: Int3,
    ): Integer;
    /**
     * Returns the sum of the absolute value of each component.
     */
    export declare function Norm1(
        _Argument1: Int3,
    ): Integer;
    export declare function DotProduct(
        _Argument1: Vec3,
        _Argument2: Vec3,
    ): Real;
    export declare function CrossProduct(
        _Argument1: Vec3,
        _Argument2: Vec3,
    ): Vec3;
    export declare function DotProduct(
        _Argument1: Vec2,
        _Argument2: Vec2,
    ): Real;
    export declare function DotProduct(
        _Argument1: Int3,
        _Argument2: Int3,
    ): Integer;
    export declare function CrossProduct(
        _Argument1: Int3,
        _Argument2: Int3,
    ): Int3;
    export declare function DotProduct(
        _Argument1: Int2,
        _Argument2: Int2,
    ): Integer;
    export declare function Angle(
        _Argument1: Vec3,
        _Argument2: Vec3,
    ): Real;
    export declare function OrientedAngle(
        _Argument1: Vec3,
        _Argument2: Vec3,
    ): Real;
    /**
     * Returns the smallest angle from A to B
     */
    export declare function Angle(
        _Radian1: Real,
        _Radian2: Real,
    ): Real;
    export declare function Angle(
        _Argument1: Vec2,
        _Argument2: Vec2,
    ): Real;
    export declare function OrientedAngle(
        _Argument1: Vec2,
        _Argument2: Vec2,
    ): Real;
    export declare function PI(): Real;
    export declare function Asin(
        _Argument1: Real,
    ): Real;
    export declare function Acos(
        _Argument1: Real,
    ): Real;
    export declare function Pow(
        _Argument1: Real,
        _Argument2: Real,
    ): Real;
    export declare function Ln(
        _Argument1: Real,
    ): Real;
    export declare function Sqrt(
        _Argument1: Real,
    ): Real;
    /**
     * Returns the maximum between A and B
     */
    export declare function Max(
        _A: Integer,
        _B: Integer,
    ): Integer;
    /**
     * Returns the minimum between A and B
     */
    export declare function Min(
        _A: Integer,
        _B: Integer,
    ): Integer;
    /**
     * Returns the value X clamped to the range Min..Max
     */
    export declare function Clamp(
        _X: Integer,
        _Min: Integer,
        _Max: Integer,
    ): Integer;
    /**
     * Returns the maximum between A and B
     */
    export declare function Max(
        _A: Real,
        _B: Real,
    ): Real;
    /**
     * Returns the minimum between A and B
     */
    export declare function Min(
        _A: Real,
        _B: Real,
    ): Real;
    /**
     * Returns the value X clamped to the range Min..Max
     */
    export declare function Clamp(
        _X: Real,
        _Min: Real,
        _Max: Real,
    ): Real;
    /**
     * Returns the modulus of X in the range Min..Max
     */
    export declare function Mod(
        _X: Real,
        _Min: Real,
        _Max: Real,
    ): Real;
    /**
     * Returns the maximum between A and B
     */
    export declare function Max(
        _A: Vec2,
        _B: Vec2,
    ): Vec2;
    /**
     * Returns the minimum between A and B
     */
    export declare function Min(
        _A: Vec2,
        _B: Vec2,
    ): Vec2;
    /**
     * Returns the value X clamped to the range Min..Max
     */
    export declare function Clamp(
        _X: Vec2,
        _Min: Vec2,
        _Max: Vec2,
    ): Vec2;
    /**
     * Returns the maximum between A and B
     */
    export declare function Max(
        _A: Vec3,
        _B: Vec3,
    ): Vec3;
    /**
     * Returns the minimum between A and B
     */
    export declare function Min(
        _A: Vec3,
        _B: Vec3,
    ): Vec3;
    /**
     * Returns the value X clamped to the range Min..Max
     */
    export declare function Clamp(
        _X: Vec3,
        _Min: Vec3,
        _Max: Vec3,
    ): Vec3;
    /**
     * Returns the maximum between A and B
     */
    export declare function Max(
        _A: Int2,
        _B: Int2,
    ): Int2;
    /**
     * Returns the minimum between A and B
     */
    export declare function Min(
        _A: Int2,
        _B: Int2,
    ): Int2;
    /**
     * Returns the value X clamped to the range Min..Max
     */
    export declare function Clamp(
        _X: Int2,
        _Min: Int2,
        _Max: Int2,
    ): Int2;
    /**
     * Returns the maximum between A and B
     */
    export declare function Max(
        _A: Int3,
        _B: Int3,
    ): Int3;
    /**
     * Returns the minimum between A and B
     */
    export declare function Min(
        _A: Int3,
        _B: Int3,
    ): Int3;
    /**
     * Returns the value X clamped to the range Min..Max
     */
    export declare function Clamp(
        _X: Int3,
        _Min: Int3,
        _Max: Int3,
    ): Int3;
}
/**
 * Standard Text manipulation functions.
 */
export namespace TextLib {
    /**
     * Returns the Real corresponding to _Text
     * Returns -1 if an invalid Text is given
     * @param _Text : The text you want to convert into a Real
     */
    export declare function ToReal(
        _Text: Text,
    ): Real;
    /**
     * Returns the Integer corresponding to _Text
     * Returns -1 if an invalid Text is given
     * @param _Text : The text you want to convert into an Integer
     */
    export declare function ToInteger(
        _Text: Text,
    ): Integer;
    /**
     * Returns the RGB color corresponding to _Text
     * Returns an empty Vec3 if an invalid Text is given
     * @param _Text : The text you want to convert into a RGB color
     */
    export declare function ToColor(
        _Text: Text,
    ): Vec3;
    /**
     * Returns a substring of _Text
     * Returns the substring of _Text beginning at the _Start index, with a length of _Length chars
     * Returns an empty Text if _Start > Text.Length or _Length == 0
     * @param _Text : The text in which we look for the substring
     * @param _Start : The beginning index of the substring
     * @param _Length : The length of the substring
     */
    export declare function SubString(
        _Text: Text,
        _Start: Integer,
        _Length: Integer,
    ): Text;
    /**
     * Returns a substring of _Text
     * Returns the substring of _Text beginning at the _Start index, with a length of _Length chars
     * Returns an empty Text if _Start > Text.Length or _Length == 0
     * @param _Text : The text in which we look for the substring
     * @param _Start : The beginning index of the substring
     * @param _Length : The length of the substring
     */
    export declare function SubText(
        _Text: Text,
        _Start: Integer,
        _Length: Integer,
    ): Text;
    /**
     * Returns the length of _Text
     * @param _Text : The text you want the length
     */
    export declare function Length(
        _Text: Text,
    ): Integer;
    /**
     * Returns the Text corresponding to _Integer
     * @param _Integer : The Integer you want to convert
     */
    export declare function ToText(
        _Integer: Integer,
    ): Text;
    /**
     * Returns the Text corresponding to _Real
     * @param _Real : The Real you want to convert
     */
    export declare function ToText(
        _Real: Real,
    ): Text;
    /**
     * Returns the Text corresponding to _Boolean
     * @param _Boolean : The Boolean you want to convert
     */
    export declare function ToText(
        _Boolean: Boolean,
    ): Text;
    /**
     * Returns the Text corresponding to _Int3
     * @param _Int3 : The Int3 you want to convert
     */
    export declare function ToText(
        _Int3: Int3,
    ): Text;
    /**
     * Returns the Text corresponding to _Vec3
     * @param _Vec3 : The Vec3 you want to convert
     */
    export declare function ToText(
        _Vec3: Vec3,
    ): Text;
    /**
     * Returns the Text corresponding to _Time
     * Converts a _Time Integer to a Text with the format HhMmSs
     * Hh will be hidden if _Time is less than one hour.
     * @param _Time : The time you want to convert into a Text
     */
    export declare function TimeToText(
        _Time: Integer,
    ): Text;
    /**
     * Returns the Text corresponding to _Time
     * Converts a _Time Integer to a Text with the following format :
     * - HhMmSsCc if IncludeCentiSeconds is True
     * - HhMmSs if there's no activated option
     * Hh will be hidden if _Time is less than one hour.
     * @param _Time : The time you want to convert into a Text
     * @param _IncludeCentiSeconds : Set IncludeCentiSeconds to True if you want the CentiSeconds to be displayed in the returned Text
     */
    export declare function TimeToText(
        _Time: Integer,
        _IncludeCentiSeconds: Boolean,
    ): Text;
    /**
     * Returns the Text corresponding to _Time
     * Converts a _Time Integer to a Text with the following format :
     * - HhMmSsMil if IncludeMilliSeconds is True
     * - HhMmSsCc if IncludeCentiSeconds is True
     * - HhMmSs if there's no activated option
     * Hh will be hidden if _Time is less than one hour.
     * @param _Time : The time you want to convert into a Text
     * @param _IncludeCentiSeconds : Set IncludeCentiSeconds to True if you want the CentiSeconds to be displayed in the returned Text
     * @param _IncludeMilliSeconds : Set IncludeMilliSeconds to True if you want the MilliSeconds to be displayed in the returned Text
     */
    export declare function TimeToText(
        _Time: Integer,
        _IncludeCentiSeconds: Boolean,
        _IncludeMilliSeconds: Boolean,
    ): Text;
    /**
     * Returns the Text corresponding to _Color
     * @param _Color : The color you want to convert into a text
     */
    export declare function ColorToText(
        _Color: Vec3,
    ): Text;
    export declare function FormatInteger(
        _Argument1: Integer,
        _Argument2: Integer,
    ): Text;
    /**
     * Returns the rank corresponding to a number, formatted according to the locale.  ShortFormat: '25k' otherwise '25654th'.
     */
    export declare function FormatRank(
        _Rank: Integer,
        _ShortFormat: Boolean,
    ): Text;
    /**
     * Returns the Text corresponding to a Real. With formatting
     * @param _Value : The Real value you want to convert
     * @param _FPartLength : The number of digits you want for the FPart
     * @param _HideZeroes : Hide trailing zeroes
     * @param _HideDot : Hide trailing dot if there is nothing after it
     */
    export declare function FormatReal(
        _Value: Real,
        _FPartLength: Integer,
        _HideZeroes: Boolean,
        _HideDot: Boolean,
    ): Text;
    /**
     * Changes lower case characters to upper case characters
     */
    export declare function ToUpperCase(
        _TextToChange: Text,
    ): Text;
    /**
     * Changes upper case characters to lower case characters
     */
    export declare function ToLowerCase(
        _TextToChange: Text,
    ): Text;
    /**
     * Return a string where the previously unclosed $< tags have their $> counterpart
     */
    export declare function CloseStyleTags(
        _String: Text,
    ): Text;
    /**
     * Compares texts without taking format characters in account.
     * Returns True if Text1 and Text2 are equal.
     * Format differences are not taken into account.
     * Case differences are taken into account if IsCaseSensitive is set to True.
     */
    export declare function CompareWithoutFormat(
        _Text1: Text,
        _Text2: Text,
        _IsCaseSensitive: Boolean,
    ): Boolean;
    /**
     * Returns True if the searched text is found in the text to search in.
     * Format is not taken into account if IsFormatSensitive is set to False.
     * Case is not taken into account if IsCaseSensitive is set to False.
     * @param _TextToFind : The text you are looking for
     * @param _TextToSearchIn : The text you are searching in
     * @param _IsFormatSensitive : True if you want to take Format into account, False elseway
     * @param _IsCaseSensitive : True if you want to take Case into account, False elseway
     */
    export declare function Find(
        _TextToFind: Text,
        _TextToSearchIn: Text,
        _IsFormatSensitive: Boolean,
        _IsCaseSensitive: Boolean,
    ): Boolean;
    /**
     * Return True if the Text ends with the TextToFind
     * @param _TextToFind : The text you are looking for
     * @param _TextToSearchIn : The text you are searching in
     */
    export declare function EndsWith(
        _TextToFind: Text,
        _TextToSearchIn: Text,
    ): Boolean;
    /**
     * Return True if the Text ends with the TextToFind
     * @param _TextToFind : The text you are looking for
     * @param _TextToSearchIn : The text you are searching in
     * @param _IsFormatSensitive : True if you want to take Format into account, False elseway
     * @param _IsCaseSensitive : True if you want to take Case into account, False elseway
     */
    export declare function EndsWith(
        _TextToFind: Text,
        _TextToSearchIn: Text,
        _IsFormatSensitive: Boolean,
        _IsCaseSensitive: Boolean,
    ): Boolean;
    /**
     * Return True if the Text starts with the TextToFind
     * @param _TextToFind : The text you are looking for
     * @param _TextToSearchIn : The text you are searching in
     */
    export declare function StartsWith(
        _TextToFind: Text,
        _TextToSearchIn: Text,
    ): Boolean;
    /**
     * Return True if the Text starts with the TextToFind
     * @param _TextToFind : The text you are looking for
     * @param _TextToSearchIn : The text you are searching in
     * @param _IsFormatSensitive : True if you want to take Format into account, False elseway
     * @param _IsCaseSensitive : True if you want to take Case into account, False elseway
     */
    export declare function StartsWith(
        _TextToFind: Text,
        _TextToSearchIn: Text,
        _IsFormatSensitive: Boolean,
        _IsCaseSensitive: Boolean,
    ): Boolean;
    export declare function Compose(
        _Argument1: Text,
    ): Text;
    export declare function Compose(
        _Argument1: Text,
        _Argument2: Text,
    ): Text;
    export declare function Compose(
        _Argument1: Text,
        _Argument2: Text,
        _Argument3: Text,
    ): Text;
    export declare function Compose(
        _Argument1: Text,
        _Argument2: Text,
        _Argument3: Text,
        _Argument4: Text,
    ): Text;
    export declare function Compose(
        _Argument1: Text,
        _Argument2: Text,
        _Argument3: Text,
        _Argument4: Text,
        _Argument5: Text,
    ): Text;
    export declare function Compose(
        _Argument1: Text,
        _Argument2: Text,
        _Argument3: Text,
        _Argument4: Text,
        _Argument5: Text,
        _Argument6: Text,
    ): Text;
    export declare function MLEncode(
        _Argument1: Text,
    ): Text;
    export declare function URLEncode(
        _Argument1: Text,
    ): Text;
    export declare function StripFormatting(
        _Argument1: Text,
    ): Text;
    /**
     * Splits a given text based on a given separators set.
     * @param _Separators : The separators to use
     * @param _Text : The text to split.
     */
    export declare function Split(
        _Separators: Text,
        _Text: Text,
    ): Array<Text>;
    /**
     * Splits a given text based on a given separators set.
     * @param _Separators : The separators to use
     * @param _Text : The text to split.
     * @param _MergeSeparators : Separator may be repeated between values (default = true)
     */
    export declare function Split(
        _Separators: Text,
        _Text: Text,
        _MergeSeparators: Boolean,
    ): Array<Text>;
    /**
     * Joins a set of texts with the given separator
     * @param _Separator : The separator to use
     * @param _Texts : The texts to join.
     */
    export declare function Join(
        _Separator: Text,
        _Texts: Array<Text>,
    ): Text;
    export declare function Trim(
        _Argument1: Text,
    ): Text;
    export declare function ReplaceChars(
        _Argument1: Text,
        _Argument2: Text,
        _Argument3: Text,
    ): Text;
    /**
     * Replaces occurences of _ToReplace in _Text with _Replacement
     * @param _Text : The text you search in
     * @param _ToReplace : The text you want to replace
     * @param _Replacement : The text you want to insert
     */
    export declare function Replace(
        _Text: Text,
        _ToReplace: Text,
        _Replacement: Text,
    ): Text;
    /**
     * Find occurences of the _Pattern in the _Text.
     * @param _Pattern : Pattern is a regular expression, similar to javascript syntax.
     * @param _Text :
     * @param _Flags : Flags can be 'g' to find all occurences, 'i' to ignore case, 'm' for multiline mode.
     */
    export declare function RegexFind(
        _Pattern: Text,
        _Text: Text,
        _Flags: Text,
    ): Array<Text>;
    /**
     * Captures the groups of the _Pattern in the matching _Text. group[0] is the whole pattern match.
     * @param _Pattern : Pattern is a regular expression, similar to javascript syntax.
     * @param _Text :
     * @param _Flags : Flags can be 'i' to ignore case, 'm' for multiline mode.
     */
    export declare function RegexMatch(
        _Pattern: Text,
        _Text: Text,
        _Flags: Text,
    ): Array<Text>;
    /**
     * Replace the _Pattern in the matching text with _Replacement.
     * @param _Pattern : Pattern is a regular expression, similar to javascript syntax.
     * @param _Text :
     * @param _Flags : Flags can be 'g' to find all occurences, 'i' to ignore case, 'm' for multiline mode.
     * @param _Replacement :
     */
    export declare function RegexReplace(
        _Pattern: Text,
        _Text: Text,
        _Flags: Text,
        _Replacement: Text,
    ): Text;
    /**
     * Lookup the text in the current translation dictionary.
     * Lookup the text in the current translation dictionary, and returns the translation, or returns the original text if not found.
     */
    export declare function GetTranslatedText(
        _Text: Text,
    ): Text;
}
/**
 * Standard map coordinates manipulation functions.
 */
export namespace MapUnits {
    export declare function GetNextDir(
        _Argument1: CMapEditorPlugin__CardinalDirections,
    ): CMapEditorPlugin__CardinalDirections;
    export declare function GetPreviousDir(
        _Argument1: CMapEditorPlugin__CardinalDirections,
    ): CMapEditorPlugin__CardinalDirections;
    export declare function GetOpposedDir(
        _Argument1: CMapEditorPlugin__CardinalDirections,
    ): CMapEditorPlugin__CardinalDirections;
    export declare function AddDirs(
        _Argument1: CMapEditorPlugin__CardinalDirections,
        _Argument2: CMapEditorPlugin__CardinalDirections,
    ): CMapEditorPlugin__CardinalDirections;
    export declare function SubDirs(
        _Argument1: CMapEditorPlugin__CardinalDirections,
        _Argument2: CMapEditorPlugin__CardinalDirections,
    ): CMapEditorPlugin__CardinalDirections;
    export declare function GetNeighbourCoord(
        _Argument1: Int3,
        _Argument2: CMapEditorPlugin__CardinalDirections,
    ): Int3;
    export declare function GetRotatedOffset(
        _Argument1: Int3,
        _Argument2: CMapEditorPlugin__CardinalDirections,
    ): Int3;
    export declare function GetRotatedOffsetPositive(
        _Argument1: Int3,
        _Argument2: CMapEditorPlugin__CardinalDirections,
        _Argument3: Int3,
    ): Int3;
}
/**
 * Standard animation functions.
 */
export namespace AnimLib {
    /**
     * Returns the value smoothly transitionning from 0 to 1
     */
    export declare function SmoothStep(
        _X: Real,
    ): Real;
    /**
     * Returns the value animated from Base to Base+Delta using Robert Penner easing functions. Function must be one of:  "Linear", "QuadIn", "QuadOut", "QuadInOut", "CubicIn", "CubicOut", "CubicInOut", "QuartIn", "QuartOut", "QuartInOut", "QuintIn", "QuintOut", "QuintInOut", "SineIn", "SineOut", "SineInOut", "ExpIn", "ExpOut", "ExpInOut", "CircIn", "CircOut", "CircInOut", "BackIn", "BackOut", "BackInOut", "ElasticIn", "ElasticOut", "ElasticInOut", "ElasticIn2", "ElasticOut2", "ElasticInOut2", "BounceIn", "BounceOut", "BounceInOut"
     */
    export declare function Ease(
        _Function: Text,
        _T: Real,
        _Base: Real,
        _Change: Real,
        _Duration: Real,
    ): Real;
    /**
     * Returns the value animated from Base to Base+Delta using R. Penner easing functions.
     */
    export declare function EaseLinear(
        _T: Integer,
        _Base: Real,
        _Change: Real,
        _Duration: Integer,
    ): Real;
    /**
     * Returns the value animated from Base to Base+Delta using R. Penner easing functions.
     */
    export declare function EaseInQuad(
        _T: Integer,
        _Base: Real,
        _Change: Real,
        _Duration: Integer,
    ): Real;
    /**
     * Returns the value animated from Base to Base+Delta using R. Penner easing functions.
     */
    export declare function EaseOutQuad(
        _T: Integer,
        _Base: Real,
        _Change: Real,
        _Duration: Integer,
    ): Real;
    /**
     * Returns the value animated from Base to Base+Delta using R. Penner easing functions.
     */
    export declare function EaseInOutQuad(
        _T: Integer,
        _Base: Real,
        _Change: Real,
        _Duration: Integer,
    ): Real;
    /**
     * Returns the value animated from Base to Base+Delta using R. Penner easing functions.
     */
    export declare function EaseInCubic(
        _T: Integer,
        _Base: Real,
        _Change: Real,
        _Duration: Integer,
    ): Real;
    /**
     * Returns the value animated from Base to Base+Delta using R. Penner easing functions.
     */
    export declare function EaseOutCubic(
        _T: Integer,
        _Base: Real,
        _Change: Real,
        _Duration: Integer,
    ): Real;
    /**
     * Returns the value animated from Base to Base+Delta using R. Penner easing functions.
     */
    export declare function EaseInOutCubic(
        _T: Integer,
        _Base: Real,
        _Change: Real,
        _Duration: Integer,
    ): Real;
    /**
     * Returns the value animated from Base to Base+Delta using R. Penner easing functions.
     */
    export declare function EaseInQuart(
        _T: Integer,
        _Base: Real,
        _Change: Real,
        _Duration: Integer,
    ): Real;
    /**
     * Returns the value animated from Base to Base+Delta using R. Penner easing functions.
     */
    export declare function EaseOutQuart(
        _T: Integer,
        _Base: Real,
        _Change: Real,
        _Duration: Integer,
    ): Real;
    /**
     * Returns the value animated from Base to Base+Delta using R. Penner easing functions.
     */
    export declare function EaseInOutQuart(
        _T: Integer,
        _Base: Real,
        _Change: Real,
        _Duration: Integer,
    ): Real;
    /**
     * Returns the value animated from Base to Base+Delta using R. Penner easing functions.
     */
    export declare function EaseInQuint(
        _T: Integer,
        _Base: Real,
        _Change: Real,
        _Duration: Integer,
    ): Real;
    /**
     * Returns the value animated from Base to Base+Delta using R. Penner easing functions.
     */
    export declare function EaseOutQuint(
        _T: Integer,
        _Base: Real,
        _Change: Real,
        _Duration: Integer,
    ): Real;
    /**
     * Returns the value animated from Base to Base+Delta using R. Penner easing functions.
     */
    export declare function EaseInOutQuint(
        _T: Integer,
        _Base: Real,
        _Change: Real,
        _Duration: Integer,
    ): Real;
    /**
     * Returns the value animated from Base to Base+Delta using R. Penner easing functions.
     */
    export declare function EaseInSine(
        _T: Integer,
        _Base: Real,
        _Change: Real,
        _Duration: Integer,
    ): Real;
    /**
     * Returns the value animated from Base to Base+Delta using R. Penner easing functions.
     */
    export declare function EaseOutSine(
        _T: Integer,
        _Base: Real,
        _Change: Real,
        _Duration: Integer,
    ): Real;
    /**
     * Returns the value animated from Base to Base+Delta using R. Penner easing functions.
     */
    export declare function EaseInOutSine(
        _T: Integer,
        _Base: Real,
        _Change: Real,
        _Duration: Integer,
    ): Real;
    /**
     * Returns the value animated from Base to Base+Delta using R. Penner easing functions.
     */
    export declare function EaseInExp(
        _T: Integer,
        _Base: Real,
        _Change: Real,
        _Duration: Integer,
    ): Real;
    /**
     * Returns the value animated from Base to Base+Delta using R. Penner easing functions.
     */
    export declare function EaseOutExp(
        _T: Integer,
        _Base: Real,
        _Change: Real,
        _Duration: Integer,
    ): Real;
    /**
     * Returns the value animated from Base to Base+Delta using R. Penner easing functions.
     */
    export declare function EaseInOutExp(
        _T: Integer,
        _Base: Real,
        _Change: Real,
        _Duration: Integer,
    ): Real;
    /**
     * Returns the value animated from Base to Base+Delta using R. Penner easing functions.
     */
    export declare function EaseInCirc(
        _T: Integer,
        _Base: Real,
        _Change: Real,
        _Duration: Integer,
    ): Real;
    /**
     * Returns the value animated from Base to Base+Delta using R. Penner easing functions.
     */
    export declare function EaseOutCirc(
        _T: Integer,
        _Base: Real,
        _Change: Real,
        _Duration: Integer,
    ): Real;
    /**
     * Returns the value animated from Base to Base+Delta using R. Penner easing functions.
     */
    export declare function EaseInOutCirc(
        _T: Integer,
        _Base: Real,
        _Change: Real,
        _Duration: Integer,
    ): Real;
    /**
     * Returns the value animated from Base to Base+Delta using R. Penner easing functions.
     */
    export declare function EaseInBack(
        _T: Integer,
        _Base: Real,
        _Change: Real,
        _Duration: Integer,
    ): Real;
    /**
     * Returns the value animated from Base to Base+Delta using R. Penner easing functions.
     */
    export declare function EaseOutBack(
        _T: Integer,
        _Base: Real,
        _Change: Real,
        _Duration: Integer,
    ): Real;
    /**
     * Returns the value animated from Base to Base+Delta using R. Penner easing functions.
     */
    export declare function EaseInOutBack(
        _T: Integer,
        _Base: Real,
        _Change: Real,
        _Duration: Integer,
    ): Real;
    /**
     * Returns the value animated from Base to Base+Delta using R. Penner easing functions.
     */
    export declare function EaseInElastic(
        _T: Integer,
        _Base: Real,
        _Change: Real,
        _Duration: Integer,
    ): Real;
    /**
     * Returns the value animated from Base to Base+Delta using R. Penner easing functions.
     */
    export declare function EaseOutElastic(
        _T: Integer,
        _Base: Real,
        _Change: Real,
        _Duration: Integer,
    ): Real;
    /**
     * Returns the value animated from Base to Base+Delta using R. Penner easing functions.
     */
    export declare function EaseInOutElastic(
        _T: Integer,
        _Base: Real,
        _Change: Real,
        _Duration: Integer,
    ): Real;
    /**
     * Returns the value animated from Base to Base+Delta using R. Penner easing functions.
     */
    export declare function EaseInElastic2(
        _T: Integer,
        _Base: Real,
        _Change: Real,
        _Duration: Integer,
    ): Real;
    /**
     * Returns the value animated from Base to Base+Delta using R. Penner easing functions.
     */
    export declare function EaseOutElastic2(
        _T: Integer,
        _Base: Real,
        _Change: Real,
        _Duration: Integer,
    ): Real;
    /**
     * Returns the value animated from Base to Base+Delta using R. Penner easing functions.
     */
    export declare function EaseInOutElastic2(
        _T: Integer,
        _Base: Real,
        _Change: Real,
        _Duration: Integer,
    ): Real;
    /**
     * Returns the value animated from Base to Base+Delta using R. Penner easing functions.
     */
    export declare function EaseInBounce(
        _T: Integer,
        _Base: Real,
        _Change: Real,
        _Duration: Integer,
    ): Real;
    /**
     * Returns the value animated from Base to Base+Delta using R. Penner easing functions.
     */
    export declare function EaseOutBounce(
        _T: Integer,
        _Base: Real,
        _Change: Real,
        _Duration: Integer,
    ): Real;
    /**
     * Returns the value animated from Base to Base+Delta using R. Penner easing functions.
     */
    export declare function EaseInOutBounce(
        _T: Integer,
        _Base: Real,
        _Change: Real,
        _Duration: Integer,
    ): Real;
}
/**
 * Standard time manipulation functions.
 */
export namespace TimeLib {
    export enum EDateFormats {
        Full,
        Date,
        DateShort,
        Time,
        TimeShort,
        Relative,
        RelativeShort,
        MonthYear,
    }
    export enum EDurationFormats {
        Full,
        Abbreviated,
        Chrono,
    }
    /**
     * Returns the date corresponding to a timestamp, formatted according to the locale. Not available on servers.
     * @param _Timestamp : Timestamp to format
     * @param _Format : Format
     */
    export declare function FormatDate(
        _Timestamp: Text,
        _Format: TimeLib.EDateFormats,
    ): Text;
    /**
     * Returns the duration between 2 timestamps, formatted according to the locale. Not available on servers.
     * @param _Timestamp1 : Timestamp1
     * @param _Timestamp2 : Timestamp2
     * @param _Format : Format
     */
    export declare function FormatDelta(
        _Timestamp1: Text,
        _Timestamp2: Text,
        _Format: TimeLib.EDurationFormats,
    ): Text;
    /**
     * Returns the duration Delta formatted according to the locale. Not available on servers.
     * @param _Delta : Delta in seconds
     * @param _Format : Format
     */
    export declare function FormatDelta(
        _Delta: Text,
        _Format: TimeLib.EDurationFormats,
    ): Text;
    /**
     * Compares 2 timestamps
     * @param _Timestamp1 : Unix timestamp
     * @param _Timestamp2 : Unix timestamp
     */
    export declare function Compare(
        _Timestamp1: Text,
        _Timestamp2: Text,
    ): Integer;
    /**
     * Returns a Real between 0 and 1, given an interval and a timestamp
     * @param _Boundary1 : Lower boundary defining the time interval
     * @param _Boundary2 : Higher boundary defining the time interval
     * @param _Timestamp : Timestamp to check
     */
    export declare function Clamp01(
        _Boundary1: Text,
        _Boundary2: Text,
        _Timestamp: Text,
    ): Real;
    /**
     * Returns a Real between 0 and 1, given a timestamp, according to the day cycle in local timezone
     * @param _Timestamp : Timestamp to check
     */
    export declare function Clamp01TZDay(
        _Timestamp: Text,
    ): Real;
    /**
     * Returns a Real between 0 and 1, given a timestamp, according to the day cycle in UTC timezone
     * @param _Timestamp : Timestamp to check
     */
    export declare function Clamp01UTCDay(
        _Timestamp: Text,
    ): Real;
    /**
     * Gets current timestamp
     */
    export declare function GetCurrent(): Text;
    /**
     * Returns the duration in seconds between 2 timestamps. May be clamped if huge.
     * @param _Timestamp1 : First timestamp. Result will be positive if this one is bigger/more recent
     * @param _Timestamp2 : Second timestamp
     */
    export declare function GetDelta(
        _Timestamp1: Text,
        _Timestamp2: Text,
    ): Integer;
    /**
     * Returns the duration in complete years between 2 timestamps, according to the local dates.
     * @param _Timestamp1 : First timestamp. Result will be positive if this one is bigger/more recent
     * @param _Timestamp2 : Second timestamp
     */
    export declare function GetLocalDelta_Years(
        _Timestamp1: Text,
        _Timestamp2: Text,
    ): Integer;
    /**
     * Returns the duration in complete months between 2 timestamps, according to the local dates.
     * @param _Timestamp1 : First timestamp. Result will be positive if this one is bigger/more recent
     * @param _Timestamp2 : Second timestamp
     */
    export declare function GetLocalDelta_Months(
        _Timestamp1: Text,
        _Timestamp2: Text,
    ): Integer;
    /**
     * Returns local milliseconds elapsed since game initialisation.
     */
    export declare function GetMillisecondsSinceInit(): Integer;
}
/**
 * Standard color manipulation functions.
 */
export namespace ColorLib {
    export declare function HsvToRgb(
        _Hsv: Vec3,
    ): Vec3;
    export declare function RgbToHsv(
        _Rgb: Vec3,
    ): Vec3;
    /**
     * Returns the Hexa3 corresponding to the RGB given.
     */
    export declare function RgbToHex3(
        _Rgb: Vec3,
    ): Text;
    /**
     * Returns the Hexa6 corresponding to the RGB given.
     */
    export declare function RgbToHex6(
        _Rrggbb: Vec3,
    ): Text;
    /**
     * Returns the RGB color corresponding to Hex3.
     * Returns an empty Vec3 if an invalid Text is given.
     * @param _Text : The text you want to convert into a RGB color.
     */
    export declare function Hex3ToRgb(
        _Text: Text,
    ): Vec3;
    /**
     * Returns the RGB color corresponding to Hex6.
     * Returns an empty Vec3 if an invalid Text is given.
     * @param _Text : The text you want to convert into a RGB color.
     */
    export declare function Hex6ToRgb(
        _Text: Text,
    ): Vec3;
    /**
     * Returns the RGB color corresponding to Hex.
     * Returns an empty Vec3 if an invalid Text is given.
     * @param _Text : The text you want to convert into a RGB color.
     */
    export declare function HexToRgb(
        _Text: Text,
    ): Vec3;
}
export enum CMlScript__LinkType {
    ExternalBrowser,
    ManialinkBrowser,
    Goto,
    ExternalFromId,
    ManialinkFromId,
    GotoFromId,
}
export enum CManiaApp__ELinkType {
    ExternalBrowser,
    ManialinkBrowser,
}
export enum CAnyEditorPlugin__EInteractionStatus {
    Active,
    Closed,
    Aborted,
}
export enum CEditorMainPlugin__EMeshEditorAPI {
    Materials,
    Interactions,
    Display,
    Global,
    Sets,
    Voxel,
    PickInfo,
    UndoRedo,
}
export enum CMode__EMedal {
    None,
    Finished,
    Bronze,
    Silver,
    Gold,
    Author,
}
export enum CSmMode__ESmScoreSortOrder {
    TotalPoints,
    RoundPoints,
    EliminationsInflicted,
    EliminationsTaken,
    Respawns,
    DamageInflicted,
    DamageTaken,
    BestRace,
    BestLap,
    PrevRace,
    Name,
    LadderRank,
}
export enum CSmMode__EWeapon {
    Laser,
    Nucleus,
    Arrow,
    Rocket,
    Missile,
}
export enum CSmMode__EActionSlot {
    Slot_A,
    Slot_B,
    Slot_C,
    Slot_D,
    Slot_E,
    Slot_F,
    Slot_G,
    Slot_H,
}
export enum CSmMode__EActionInput {
    Weapon,
    Secondary,
    Movement,
    QuickAccess1,
    QuickAccess2,
    QuickAccess3,
    QuickAccess4,
    QuickAccess5,
    QuickAccess6,
    QuickAccess7,
    QuickAccess8,
    QuickAccess9,
    QuickAccess0,
    Consumable1,
    Consumable2,
    None,
}
export enum CSmMode__EGameplay {
    Default,
    Mp3Beta0,
}
export enum CSmMode__ERespawnBehaviour {
    Custom,
    DoNothing,
    GiveUpBeforeFirstCheckpoint,
    AlwaysGiveUp,
    AlwaysRespawn,
}
export enum CSmMode__ECheckpointBehaviour {
    Custom,
    Default,
    InfiniteLaps,
}
export enum CSmMode__EGiveUpBehaviour {
    Custom,
    DoNothing,
    GiveUp,
}
export enum CMapEditorPlugin__CardinalDirections {
    North,
    East,
    South,
    West,
}
export enum CMapEditorPlugin__CardinalDirections8 {
    North,
    East,
    South,
    West,
    NorthEast,
    SouthEast,
    SouthWest,
    NorthWest,
}
export enum CMapEditorPlugin__RelativeDirections {
    Forward,
    RightForward,
    Right,
    RightBackward,
    Backward,
    LeftBackward,
    Left,
    LeftForward,
}
export enum CMapEditorPlugin__PlaceMode {
    Unknown,
    Terraform,
    Block,
    Macroblock,
    Skin,
    CopyPaste,
    Test,
    Plugin,
    CustomSelection,
    OffZone,
    BlockProperty,
    Path,
    GhostBlock,
    Item,
    Light,
    FreeBlock,
    FreeMacroblock,
}
export enum CMapEditorPlugin__EditMode {
    Unknown,
    Place,
    FreeLook,
    Erase,
    Pick,
    SelectionAdd,
    SelectionRemove,
}
export enum CMapEditorPlugin__ShadowsQuality {
    NotComputed,
    VeryFast,
    Fast,
    Default,
    High,
    Ultra,
}
export enum CMapEditorPlugin__ValidationStatus {
    NotValidable,
    Validable,
    Validated,
}
export enum CMapEditorPlugin__MapElemColor {
    Default,
    White,
    Green,
    Blue,
    Red,
    Black,
}
export enum CMapEditorPlugin__PhaseOffset {
    None,
    One8th,
    Two8th,
    Three8th,
    Four8th,
    Five8th,
    Six8th,
    Seven8th,
}
export enum CMapEditorPlugin__MapElemLightmapQuality {
    Normal,
    High,
    VeryHigh,
    Highest,
    Low,
    VeryLow,
    Lowest,
}
export enum CMapType__ValidationStatus {
    NotValidable,
    Validable,
    Validated,
}
export enum CMlScriptIngame__EInGameMenuResult {
    Resume,
    Quit,
    NormalMenu,
    AdvancedMenu,
    ServerSettings,
}
export enum CMlScriptIngame__EUISound {
    Default,
    Silence,
    StartMatch,
    EndMatch,
    StartRound,
    EndRound,
    PhaseChange,
    TieBreakPoint,
    TiePoint,
    VictoryPoint,
    Capture,
    TimeOut,
    Notice,
    Warning,
    PlayerEliminated,
    PlayerHit,
    Checkpoint,
    Finish,
    Record,
    ScoreProgress,
    RankChange,
    Bonus,
    FirstHit,
    Combo,
    PlayersRemaining,
    Custom1,
    Custom2,
    Custom3,
    Custom4,
}
export enum CMlScript_ReadOnly__ESystemPlatform {
    None,
    Steam,
    UPlay,
    PS4,
    XBoxOne,
    PS5,
    XBoxSeries,
    Stadia,
    Luna,
}
export enum CMlScript_ReadOnly__ESystemSkuIdentifier {
    Unknown,
    EU,
    US,
    JP,
    CN,
}
export enum CUser__EEchelon {
    None,
    Bronze1,
    Bronze2,
    Bronze3,
    Silver1,
    Silver2,
    Silver3,
    Gold1,
    Gold2,
    Gold3,
}
export enum CUser__ETagType {
    Bronze,
    Silver,
    Gold,
    Nadeo,
}
export enum CUser__EStereoDisplayMode {
    None,
    Stereo,
    HMD,
}
export enum CMlScriptEvent__Type {
    KeyPress,
    MouseClick,
    MouseRightClick,
    MouseOver,
    MouseOut,
    EntrySubmit,
    MenuNavigation,
    PluginCustomEvent,
}
export enum CMlScriptEvent__EMenuNavAction {
    Up,
    Right,
    Left,
    Down,
    Select,
    Cancel,
    PageUp,
    PageDown,
    AppMenu,
    Action1,
    Action2,
    Action3,
    Action4,
    ScrollUp,
    ScrollDown,
}
export enum CMlControl__AlignHorizontal {
    Left,
    HCenter,
    Right,
    None,
}
export enum CMlControl__AlignVertical {
    Top,
    VCenter,
    Bottom,
    None,
    VCenter2,
}
export enum CAudioManager__ELibSound {
    Alert,
    ShowDialog,
    HideDialog,
    ShowMenu,
    HideMenu,
    Focus,
    Valid,
    Start,
    Countdown,
    Victory,
    ScoreIncrease,
    Checkpoint,
}
export enum CInputManager__EButton {
    Left,
    Right,
    Up,
    Down,
    A,
    B,
    X,
    Y,
    L1,
    R1,
    LeftStick,
    RightStick,
    Menu,
    View,
    LeftStick_Left,
    LeftStick_Right,
    LeftStick_Up,
    LeftStick_Down,
    RightStick_Left,
    RightStick_Right,
    RightStick_Up,
    RightStick_Down,
    L2,
    R2,
    None,
}
export enum CInputManager__EPadType {
    Keyboard,
    Mouse,
    Generic,
    XBox,
    PlayStation,
    Vive,
}
export enum CDataFileMgr__EMediaType {
    Image,
    Sound,
    Script,
    MatchSettings,
    Module,
    Skins,
    ItemCollection,
}
export enum CScoreMgr__ELocalScoreStatus {
    None,
    Loading,
    NotLoaded,
    Loaded,
}
export enum CScoreMgr__EMasterServerScoreStatus {
    None,
    Synchronizing,
    NotSynchronized,
    Synchronized,
}
export enum CUserV2Manager__ECrossPlayState {
    Unknown,
    Disabled,
    Enabled,
}
export enum CUserV2Manager__EPrestigeMode {
    Unknown,
    Ranked,
    Royal,
    Season,
}
export enum CAnimManager__EAnimManagerEasing {
    Linear,
    QuadIn,
    QuadOut,
    QuadInOut,
    CubicIn,
    CubicOut,
    CubicInOut,
    QuartIn,
    QuartOut,
    QuartInOut,
    QuintIn,
    QuintOut,
    QuintInOut,
    SineIn,
    SineOut,
    SineInOut,
    ExpIn,
    ExpOut,
    ExpInOut,
    CircIn,
    CircOut,
    CircInOut,
    BackIn,
    BackOut,
    BackInOut,
    ElasticIn,
    ElasticOut,
    ElasticInOut,
    ElasticIn2,
    ElasticOut2,
    ElasticInOut2,
    BounceIn,
    BounceOut,
    BounceInOut,
}
export enum CSystemPlatform__ESystemPlatform {
    None,
    Steam,
    UPlay,
    PS4,
    XBoxOne,
    PS5,
    XBoxSeries,
    Stadia,
    Luna,
}
export enum CSystemPlatform__ESystemSkuIdentifier {
    Unknown,
    EU,
    US,
    JP,
    CN,
}
export enum CUILayer__EUILayerType {
    Normal,
    ScoresTable,
    ScreenIn3d,
    AltMenu,
    Markers,
    CutScene,
    InGameMenu,
    EditorPlugin,
    ManiaplanetPlugin,
    ManiaplanetMenu,
    LoadingScreen,
}
export enum CUILayer__EUILayerAnimation {
    None,
    DownFast,
    DownSlow,
    LeftFast,
    LeftSlow,
    RightFast,
    RightSlow,
    ScaleFast,
    ScaleSlow,
    UpFast,
    UpSlow,
}
export enum CTrackingMgr__EEventColorLevel {
    White,
    Green,
    Blue,
    Red,
    Black,
}
export enum CTrackingMgr__EEventMedalLevel {
    Finished,
    Bronze,
    Silver,
    Gold,
    Author,
}
export enum CTrackingMgr__EEventSeason {
    Winter,
    Spring,
    Summer,
    Fall,
}
export enum CTrackingMgr__EPlayTimeContext {
    None,
    Club,
    Create,
    Live,
    Local,
    Solo,
}
export enum CUIConfig__EUISequence {
    None,
    Playing,
    Intro,
    Outro,
    Podium,
    CustomMTClip,
    EndRound,
    PlayersPresentation,
    UIInteraction,
    RollingBackgroundIntro,
    CustomMTClip_WithUIInteraction,
    Finish,
}
export enum CUIConfig__EUIStatus {
    None,
    Normal,
    Warning,
    Error,
    Official,
}
export enum CUIConfig__EVisibility {
    None,
    Normal,
    Manual,
    ForcedHidden,
    ForcedVisible,
}
export enum CUIConfig__ELabelsVisibility {
    None,
    Never,
    Always,
    WhenInFrustum,
    WhenVisible,
    WhenInMiddleOfScreen,
}
export enum CUIConfig__EAvatarVariant {
    Default,
    Sad,
    Happy,
}
export enum CUIConfig__EUISound {
    Default,
    Silence,
    StartMatch,
    EndMatch,
    StartRound,
    EndRound,
    PhaseChange,
    TieBreakPoint,
    TiePoint,
    VictoryPoint,
    Capture,
    TimeOut,
    Notice,
    Warning,
    PlayerEliminated,
    PlayerHit,
    Checkpoint,
    Finish,
    Record,
    ScoreProgress,
    RankChange,
    Bonus,
    FirstHit,
    Combo,
    PlayersRemaining,
    Custom1,
    Custom2,
    Custom3,
    Custom4,
}
export enum CUIConfig__ENoticeLevel {
    Default,
    PlayerInfo,
    PlayerWarning,
    MapInfo,
    MapWarning,
    MatchInfo,
    MatchWarning,
}
export enum CUIConfig__EMessageDisplay {
    Chat,
    Small,
    Status,
    Big,
}
export enum CUIConfig__EObserverMode {
    Default,
    Forced,
    Forbidden,
    Manual,
}
export enum CUIConfig__EHudVisibility {
    Nothing,
    Everything,
    MarkersOnly,
    Default,
}
export enum CUIConfig__ECutSceneStyle {
    None,
    TM,
    SM,
}
export enum CServerPluginEvent__EType {
    Unknown,
    ClientConnected,
    ClientDisconnected,
    MapLoaded,
    BeginMatch,
    BeginRound,
    EndRound,
    EndMatch,
    MapUnloadRequested,
    MapUnloaded,
    ChatCommand,
    ChatMessage,
    ModeCallback,
}
export enum CServerPluginEvent__EChatOption {
    Default,
    ToSpectatorCurrent,
    ToSpectatorAll,
    ToTeam,
}
export enum CServerAdmin__ESpecMode {
    Selectable,
    SpectatorForced,
    PlayerForced,
    SpectatorSelectable,
    PlayerSelectable,
}
export enum CSmPlayer__ESpawnStatus {
    NotSpawned,
    Spawning,
    Spawned,
}
export enum CSmModeEvent__EType {
    Unknown,
    OnShoot,
    OnHit,
    OnNearMiss,
    OnArmorEmpty,
    OnCapture,
    OnShotDeny,
    OnFallDamage,
    OnCommand,
    OnPlayerAdded,
    OnPlayerRemoved,
    OnPlayerRequestRespawn,
    OnActionCustomEvent,
    OnActionEvent,
    OnPlayerTouchesObject,
    OnPlayerThrowsObject,
    OnPlayerTriggersSector,
    OnPlayerTriggersWaypoint,
    OnPlayerRequestActionChange,
    OnVehicleArmorEmpty,
    OnVehicleCollision,
    OnVehicleVsVehicleCollision,
    OnPlayerRequestItemInteraction,
}
export enum CSmModeEvent__EActionSlot {
    Slot_A,
    Slot_B,
    Slot_C,
    Slot_D,
    Slot_E,
    Slot_F,
    Slot_G,
    Slot_H,
}
export enum CSmModeEvent__EActionInput {
    Weapon,
    Secondary,
    Movement,
    QuickAccess1,
    QuickAccess2,
    QuickAccess3,
    QuickAccess4,
    QuickAccess5,
    QuickAccess6,
    QuickAccess7,
    QuickAccess8,
    QuickAccess9,
    QuickAccess0,
    Consumable1,
    Consumable2,
    None,
}
export enum CSmObject__EStatus {
    OnPlayer,
    OnAnchor,
    InWorld,
    Unspawned,
}
export enum CSmActionEvent__EType {
    OnHitPlayer,
    OnProjectileEnd,
    OnProjectileDestroyed,
    OnHitObject,
    OnHitShield,
    OnHitVehicle,
    OnShieldEnd,
    OnHitTurret,
    OnInputChange,
    OnFocusedScroll,
}
export enum CSmActionEvent__EInputChange {
    IsActive,
    Focused_Main,
    Focused_Secondary,
    Focused_QuickAccess1,
    Focused_QuickAccess2,
    Focused_QuickAccess3,
    Focused_QuickAccess4,
    Focused_QuickAccess5,
    Focused_QuickAccess6,
    Focused_QuickAccess7,
    Focused_QuickAccess8,
    Focused_QuickAccess9,
    Focused_QuickAccess0,
    Focused_Consumable1,
    Focused_Consumable2,
}
export enum CGameUserVoiceChat__EMuteSetting {
    Muted,
    NotMuted,
}
export enum CEditorModule__EModuleType {
    Undefined,
    Hud,
    Inventory,
    Store,
    ScoresTable,
    Equipment,
    MenuBase,
    MenuPage,
    Chrono,
    SpeedMeter,
    PlayerState,
    TeamState,
}
export enum CEditorMesh__EEdgesDisplay {
    Any,
    Borders,
    None,
}
export enum CEditorMesh__EEdgesConstraint {
    Any,
    Adjacent,
    Closed,
}
export enum CEditorMesh__EElemType {
    Vertex,
    Edge,
    Face,
    EVoxel,
    Any,
}
export enum CEditorMesh__EInteraction {
    Creation,
    Pick,
    PickJoint,
    VoxelPickDrag_Base,
    VoxelPickDrag_Creation,
    VoxelPickDrag_Delete,
    VoxelPickDrag_Select,
    VoxelPickDrag_Pick,
    VoxelPickDrag_SelectTranslation,
    VoxelPickDrag_SelectRotation,
    VoxelPickDrag_Paste,
    Selection,
    Translation,
    PickTranslation,
    ExtrudeTranslation,
    Rotation,
    PickRotation,
    Scale,
    Curve2D,
    Merge,
    Split,
    Mirror,
    Paste,
    PasteMaterial,
    BlocTransformation,
    None,
}
export enum CEditorMesh__ETexCoordLayer {
    Lightmap,
}
export enum CEditorMesh__EMaterialFilterCriterion {
    IsAutomatic,
    IsBadForHorizontalFaces,
    IsBadForVerticalFaces,
}
export enum CEditorMesh__EFilterKind {
    NoFilter,
    PassIfMatches,
    CutIfMatches,
}
export enum CEditorMesh__EUVEditorMode {
    UV,
    Atlas_ApplyOnClic,
    Atlas_SelectOnClic,
}
export enum CEditorMesh__EUVEditorProjectionType {
    Planar,
    Curve2D,
    Cylindrical2D,
    Cubic,
    Polyedric,
    Cylindrical,
    ApplyOnlyMaterial,
}
export enum CEditorMesh__ELayerType {
    AddGeometry,
    SubdivideSmooth,
    Translation,
    Rotation,
    Scale,
    Mirror,
    MoveToGround,
    Extrude,
    Subdivide,
    Chaos,
    Smooth,
    BorderTransition,
    BlocTransfo,
    Voxels,
    TriggerShape,
    RespawnPos,
    Sector,
    Light,
    LightModel,
    WaterShape,
    None,
}
export enum CEditorMesh__ETitleCoreType {
    TrackMania,
    ShootMania,
}
export enum CEditorPluginAPI__EEditorFileToolBar_QuadType {
    Quit,
    New,
    Open,
    SaveAs,
    Save,
    Import,
    Export,
    Close,
    Help,
}
export enum CEditorMediaTracker__EMediaTrackerBlockType {
    Ghost,
    CameraCustom,
    CameraPath,
    Time,
    FxColors,
    Sound,
    Fog,
    TransitionFade,
    CameraEffectShake,
    CameraEffectScript,
    Stereo3d,
    DOF,
    ToneMapping,
    BloomHdr,
    DirtyLens,
    ColorGrading,
    FxCameraBlend,
    MusicEffect,
    TimeSpeed,
    TextBlock,
    Image,
    ColoringCapturable,
    ColoringBase,
    CameraGame,
    Trails,
    Manialink,
    EditingCut,
    CamFxInertialTracking,
    VehicleLight,
    Interface,
    Triangles2D,
    Triangles3D,
    CameraOrbital,
    OpponentVisibility,
    Spectators,
}
export enum CEditorMediaTracker__EMediaTrackerCopyType {
    None,
    Key,
    Block,
}
export enum CEditorMediaTracker__EMediaTrackerPasteType {
    None,
    KeyInfo,
    NewKey,
    BlockCurrentTrack,
    BlockNewTrack,
}
export enum CEditorMediaTracker__EMediaTrackerGhostRef {
    Author,
    Ghost1,
    Ghost2,
    Ghost3,
}
export enum CEditorSkin__EPainterMode {
    NoOp,
    Fill,
    Brush,
    Sticker,
    Layer,
    BadgeSlots,
    Team,
}
export enum CEditorSkin__EPainterSolidType {
    Other,
    CarWithPilot,
    Pilot_Male,
    Pilot_Female,
    Helmet,
}
export enum CEditorSkin__EEditorSkin_IconType {
    Stickers,
    Brushs,
    Layers,
    SubObjects,
}
export enum CTitleControl__ESplitScreenLayout {
    Horizontal,
    Vertical,
    Four,
}
export enum CTitleControl__EResult {
    Success,
    Error_Internal,
    Error_DataMgr,
    Error_Net_ServerNotFound,
    Error_Net_ServerUnreachable,
    Error_Net_Disconnected,
    Error_Net_WrongPassword,
    Error_Network_OnlineExpired,
    Error_Network_ServerFull,
    Error_Abort,
}
export enum CTitleControl__EEditorType {
    ActionMaker,
    ChallengeEditor,
    ItemEditor,
    InterfaceDesigner,
    MeshModeler,
}
export enum CTitleControl__EReplayEditType {
    None,
    Edit,
    View,
    Shoot,
}
export enum CStation__EEchelon {
    None,
    Bronze1,
    Bronze2,
    Bronze3,
    Silver1,
    Silver2,
    Silver3,
    Gold1,
    Gold2,
    Gold3,
}
export enum CMlTextEdit__EControlScriptEditorTextFormat {
    Basic,
    Script,
    Password,
    Newpassword,
}
export enum CMlEntry__ETextFormat {
    Basic,
    Script,
    Password,
    Newpassword,
}
export enum CMlEntry__ValueType {
    Ml_Unknown,
    Ml_Natural,
    Ml_Integer,
    Ml_Real,
    Ml_String,
    Ml_TimeMmSsCc,
    Ml_TimeHhMmSs,
    Ml_RealFormated,
    Ml_TimeMmSs,
    Ml_Ascii7bit,
    Ml_Real3Decimals,
    Ml_TimeHhMmSs_24,
    Ml_TimeHhMm,
    Ml_Percent,
    Ml_Hexa,
    Ml_TimeHhMmSsOrMmSs,
    Ml_TimeHhMmFromSeconds,
    Ml_TimeHhMmSsMil,
}
export enum CMlLabel__EBlendMode {
    Default,
    Add,
}
export enum CMlLabel__EFilterProfanities {
    Never,
    OnlyIfNotTranslated,
    Always,
}
export enum CMlQuad__EKeepRatioMode {
    Inactive,
    Clip,
    Fit,
}
export enum CMlQuad__EBlendMode {
    Default,
    Add,
}
export enum CHttpEvent__EType {
    RequestComplete,
}
export enum CVideo__ETextureFilter {
    Default,
    Point,
}
export enum CAudioSourceMusic__EUpdateMode {
    Cut,
    OnNextBar,
    OnNextHalfBar,
    OnNextBeat,
}
export enum CInputEvent__EType {
    PadButtonPress,
}
export enum CInputEvent__EButton {
    Left,
    Right,
    Up,
    Down,
    A,
    B,
    X,
    Y,
    L1,
    R1,
    LeftStick,
    RightStick,
    Menu,
    View,
    LeftStick_Left,
    LeftStick_Right,
    LeftStick_Up,
    LeftStick_Down,
    RightStick_Left,
    RightStick_Right,
    RightStick_Up,
    RightStick_Down,
    L2,
    R2,
    None,
}
export enum CInputPad__EButton {
    Left,
    Right,
    Up,
    Down,
    A,
    B,
    X,
    Y,
    L1,
    R1,
    LeftStick,
    RightStick,
    Menu,
    View,
    LeftStick_Left,
    LeftStick_Right,
    LeftStick_Up,
    LeftStick_Down,
    RightStick_Left,
    RightStick_Right,
    RightStick_Up,
    RightStick_Down,
    L2,
    R2,
    None,
}
export enum CInputPad__EPadType {
    Keyboard,
    Mouse,
    Generic,
    XBox,
    PlayStation,
    Vive,
}
export enum CUserV2Profile__EMapEditorMode {
    Ask,
    Advanced,
}
export enum CUserV2Profile__EMapEditorMood {
    Sunrise,
    Day,
    Sunset,
    Night,
}
export enum CUserV2Profile__EMapEditorDifficulty {
    Simple,
    Advanced,
    Expert,
}
export enum CUserV2Profile__ECustomPlayerModels {
    All,
    OnlyTextures,
    None,
}
export enum CUserV2Profile__EInputMouseReleaseKey {
    LeftAlt,
    RightAlt,
    LeftCtrl,
    RightCtrl,
}
export enum CUserV2Profile__EPlayerVisibility {
    Hidden,
    Ghost,
    Opaque,
}
export enum CUserV2Profile__ERoadsideSpectatorVisibility {
    Never,
    SpectatorOnly,
    Always,
}
export enum CUserV2Profile__EIngameChatBackground {
    Hidden,
    Transparent,
    Opaque,
}
export enum CUserV2Profile__EIngameChatTextSize {
    Medium,
    Small,
    Big,
}
export enum CMasterServerUser__EMasterServerConnectionStatus {
    NotConnected,
    Connecting,
    Connected,
    Disconnecting,
}
export enum CManiaAppEvent__EType {
    LayerCustomEvent,
    KeyPress,
    ExternalCustomEvent,
    MenuNavigation,
}
export enum CManiaAppEvent__EMenuNavAction {
    Up,
    Right,
    Left,
    Down,
    Select,
    Cancel,
    PageUp,
    PageDown,
    AppMenu,
    Action1,
    Action2,
    Action3,
    Action4,
    ScrollUp,
    ScrollDown,
}
export enum CTitleEdition__EDrive {
    TitleReadable,
    Title,
    User,
}
export enum CNotificationsConsumer__EFilterPriority {
    All,
    MoreThanMemo,
    MoreThanNotice,
}
export enum CVoiceChatConfig__ESyncMode {
    Default,
    Disabled,
    Manual,
    Clan,
    Squad,
}
export enum CMapEditorPluginEvent__Type {
    LayerCustomEvent,
    KeyPress,
    reserved,
    MenuNavigation,
    CursorSelectionBegin,
    CursorSelectionEnd,
    CursorChange,
    MapModified,
    EditorInput,
    MapSavedOrSaveCancelled,
    EditAnchor,
    EditObjectives,
    StartValidation,
    StartTest,
}
export enum CMapEditorPluginEvent__EInput {
    Unknown,
    Menu,
    SwitchToRace,
    Undo,
    Redo,
    CursorUp,
    CursorRight,
    CursorDown,
    CursorLeft,
    CursorRaise,
    CursorLower,
    CursorTurn,
    CursorTurnSlightly,
    CursorTurnSlightlyAntiClockwise,
    CursorTiltLeft,
    CursorTiltRight,
    CursorPick,
    CursorPlace,
    CursorDelete,
    CameraUp,
    CameraRight,
    CameraDown,
    CameraLeft,
    CameraZoomNext,
    Camera0,
    Camera1,
    Camera3,
    Camera7,
    Camera9,
    PivotChange,
    IconUp,
    IconRight,
    IconDown,
    IconLeft,
    RemoveAll,
    Save,
    SelectAll,
    Copy,
    Cut,
    Paste,
}
export enum CBlockModel__EWayPointType {
    Start,
    Finish,
    Checkpoint,
    None,
    StartFinish,
    Dispenser,
}
export enum CBlock__CardinalDirections {
    North,
    East,
    South,
    West,
}
export enum CAnchorData__EWaypointType {
    Start,
    Finish,
    Checkpoint,
    None,
    StartFinish,
    Dispenser,
}
export enum CMapEditorCamera__EZoomLevel {
    Close,
    Medium,
    Far,
}
export enum CMapEditorCamera__ECameraVStep {
    Low,
    MediumLow,
    Medium,
    MediumHigh,
    High,
}
export enum CUIConfigMarker__EAnchorType {
    Invalid,
    Position,
    Player,
    Entity,
    Landmark,
    GhostInstance,
}
export enum CUIConfigMarker__EMiniMapVisibility {
    Never,
    Always,
    WhenInFrame,
}
export enum CUIConfigMarker__EHudVisibility {
    Never,
    Always,
    WhenInFrustum,
    WhenVisible,
    WhenInMiddleOfScreen,
}
export enum CUIConfigEvent__EType {
    Unknown,
    OnModuleCustomEvent,
    OnModuleShowRequest,
    OnModuleHideRequest,
    OnModuleStorePurchase,
    OnModuleInventoryDrop,
    OnModuleInventoryEquip,
    OnLayerCustomEvent,
}
export enum CUIConfigEvent__EModuleType {
    Undefined,
    Hud,
    Inventory,
    Store,
    ScoresTable,
    Equipment,
    MenuBase,
    MenuPage,
    Chrono,
    SpeedMeter,
    PlayerState,
    TeamState,
}
export enum CXmlRpcEvent__EType {
    Unknown,
    Callback,
    CallbackArray,
}
export enum CTmRaceResultNod__ETmRaceResultCriteria {
    Time,
    Stunts,
    NbRespawns,
    CheckpointsProgress,
    None,
}
export enum CModeVehicleManager__EArmorUse {
    Self,
    Group,
    Owner,
    Children,
    Mine,
}
export enum CModeVehicleManager__ESlotType {
    Driver,
    Passenger,
}
export enum CActionManager__EActionSlot {
    Slot_A,
    Slot_B,
    Slot_C,
    Slot_D,
    Slot_E,
    Slot_F,
    Slot_G,
    Slot_H,
}
export enum CSmPlayerDriver__ESmDriverBehaviour {
    Static,
    Turret,
    Scripted,
    IA,
    Patrol,
    Escape,
    Saunter,
    Orbit,
    Follow,
}
export enum CSmPlayerDriver__ESmDriverPathState {
    Static,
    None,
    Computing,
    Simple,
    Full,
    Incomplete,
    InFlock,
}
export enum CSmPlayerDriver__ESmDriverPatrolMode {
    OneTrip,
    BackAndForth,
    Loop,
}
export enum CSmPlayerDriver__ESmAttackFilter {
    All,
    AllPlayers,
    AllBots,
    AllOpposite,
    OppositePlayers,
    OppositeBots,
    Nobody,
}
export enum CPlaygroundClient__ESpectatorCameraType {
    Replay,
    Follow,
    Free,
    StandardCount,
    NotUsed0,
    NotUsed1,
    NotUsed2,
    NotUsed3,
    NotUsed4,
    NotUsed5,
    NotUsed6,
    NotUsed7,
    NotUsed8,
    NotUsed9,
    FollowForced,
    DontChange,
}
export enum CPlaygroundClient__ESpectatorTargetType {
    None,
    Single,
    AllPlayers,
    AllMap,
}
export enum CModuleMenuFileBrowser__EFileType {
    Maps,
    Skins,
    Items,
    Blocks,
    Scripts,
    Images,
    Manialinks,
    Packs,
    Actions,
    Modules,
    Meshes,
    Replays,
}
export enum CModuleMenuFileBrowser__EFileAction {
    Select,
    Save,
    MultiSelect,
}
export enum CModulePlaygroundScoresTable__EColumnType {
    CustomString,
    CustomNatural,
    CustomInteger,
    CustomReal,
    CustomTime,
    Avatar,
    Name,
    ManiaStars,
    Tools,
    Tags,
    TMBestTime,
    TMPrevTime,
    TMBestLapTime,
    TMStunts,
    TMRespawns,
    TMCheckpoints,
    TMPoints,
    TMPrevRaceDeltaPoints,
    SMPoints,
    SMRoundPoints,
}
export enum CModulePlaygroundScoresTable__EScoreSortOrder {
    Default,
    Name,
    LadderRanking,
    TMPoints,
    TMBestTime,
    TMBestLapTime,
    TMStunts,
    TMRespawns,
    TMCheckpoints,
    TMPrevTime,
    SMPoints,
    SMRoundPoints,
}
export enum CEditorPluginModuleEvent__Type {
    LayerCustomEvent,
    KeyPress,
    reserved,
    MenuNavigation,
    Exit,
    FileNew,
    FileOpen,
    FileSave,
    FileSaveAs,
}
export enum CEditorEvent__Type {
    LayerCustomEvent,
    KeyPress,
    reserved,
    MenuNavigation,
    FileChanged,
    Exit,
    FileSave,
    OnUndo,
    OnRedo,
    OnSwitchedBack,
    CameraButtonOn,
    CameraButtonOff,
    VoxelUpdateMaterial,
    OpenUVEditor,
    CloseUVEditor,
    EnableUndo,
    DisableUndo,
    EnableRedo,
    DisableRedo,
    UpdateUI,
    UpdateSliders,
    UpdateMaterialsLibPage,
    MediaTrackerPopUp,
    HideUI,
    ShowUI,
    EnableFullScreen,
    DisableFullScreen,
    Autosave,
}
export enum CNotificationsConsumerEvent__EType {
    NewNotification,
    NotificationChanged,
}
export enum CNotificationsConsumerNotification__ENotificationPriority {
    Memo,
    Notice,
    Alarm,
}
export enum CManiaAppPlaygroundEvent__Type {
    LayerCustomEvent,
    KeyPress,
    reserved,
    MenuNavigation,
    PlaygroundScriptEvent,
    GhostAdded,
    RecordUpdated,
    RecordsUpdated,
    OnPlayerTriggerSpecial,
    OnPlayerTriggerWaypoint,
}
export enum CManiaAppPlaygroundEvent__GameplaySpecialType {
    None,
    Turbo,
    Turbo2,
    TurboRoulette,
    FreeWheeling,
    NoGrip,
    NoSteering,
    ForceAcceleration,
    Reset,
    SlowMotion,
    Bumper,
    Bumper2,
    ReactorBoost_Legacy,
    Fragile,
    ReactorBoost2_Legacy,
    Bouncy,
    NoBrakes,
    Cruise,
    ReactorBoost_Oriented,
    ReactorBoost2_Oriented,
    VehicleTransform_Reset,
    VehicleTransform_CarSnow,
    XXX_Null,
}
export enum CManiaAppPlaygroundEvent__GameplayTurboRoulette {
    TurboRoulette_None,
    TurboRoulette_1,
    TurboRoulette_2,
    TurboRoulette_3,
}
