•	//var Color = importNamespace('PixelCombats.ScriptingApi.Structures');
//var System = importNamespace('System');

// константы
var WaitingPlayersTime = 1;
var BuildBaseTime = 1;
var GameModeTime = false;
var EndOfMatchTime =5;

// константы имен
var WaitingStateValue = "Waiting";
var BuildModeStateValue = "BuildMode";
var GameStateValue = "Game";
var EndOfMatchStateValue = "EndOfMatch";

// посто€нные переменные
var mainTimer = Timers.GetContext().Get("Main");
var stateProp = Properties.GetContext().Get("State");

// примен€ем параметры создани€ комнаты
Damage.FriendlyFire = GameMode.Parameters.GetBool("FriendlyFire");
Map.Rotation = GameMode.Parameters.GetBool("MapRotation");
BreackGraph.OnlyPlayerBlocksDmg = GameMode.Parameters.GetBool("PartialDesruction");
BreackGraph.WeakBlocks = GameMode.Parameters.GetBool("LoosenBlocks");
Damage.GetContext().FriendlyFire.Value = true;
Build.GetContext().Pipette.Value = true;
Players.Get("7CE37DE570BF7B0C").Build.FloodFill.Value = true;
Players.Get("7CE37DE570BF7B0C").Build.FillQuad.Value = true;
Players.Get("7CE37DE570BF7B0C").Build.RemoveQuad.Value = true;
Build.GetContext().BalkLenChange.Value = true;
Build.GetContext().FlyEnable.Value = false;
Build.GetContext().SetSkyEnable.Value = true;
Build.GetContext().GenMapEnable.Value = true;
Build.GetContext().ChangeCameraPointsEnable.Value = true;
Build.GetContext().QuadChangeEnable.Value = true;
Build.GetContext().BuildModeEnable.Value = true;
Build.GetContext().CollapseChangeEnable.Value = true;
Build.GetContext().RenameMapEnable.Value = true;
Build.GetContext().ChangeMapAuthorsEnable.Value = true;
Build.GetContext().LoadMapEnable.Value = true;
Build.GetContext().ChangeSpawnsEnable.Value = true;
Players.Get("7CE37DE570BF7B0C").Build.FlyEnable.Value = true;
Players.Get("7CE37DE570BF7B0C").Damage. DamageIn.Value = false;
Players.Get("7CE37DE570BF7B0C").Build.BlocksSet.Value = BuildBlocksSet.AllClear;

// блок игрока всегда усилен
BreackGraph.PlayerBlockBoost = true;

// параметры игры
Properties.GetContext().GameModeName.Value = "GameModes/Team Dead Match";
TeamsBalancer.IsAutoBalance = false;
Ui.GetContext().MainTimerId.Value = mainTimer.Id;
// создаем команды
Teams.Add("Blue", "<size=30><color=#ffec00>П</color><color=#ffec00>А</color><color=#ffec00>Ц</color><color=#ffec00>А</color><color=#ffec00>Н</color><color=#ffec00>Ы</color></size>", { g: 1 });
Teams.Add("Red", "<size=30><color=#ffec00>Д</color><color=#ffec00>Е</color><color=#ffec00>В</color><color=#ffec00>У</color><color=#ffec00>Ш</color><color=#ffec00>К</color><color=#ffec00>И</color></size>", { g: 1 });
var blueTeam = Teams.Get("Blue");
var redTeam = Teams.Get("Red");

blueTeam.Spawns.SpawnPointsGroups.Add(1);
redTeam.Spawns.SpawnPointsGroups.Add(2);

blueTeam.Build.BlocksSet.Value = BuildBlocksSet.Blue;
redTeam.Build.BlocksSet.Value = BuildBlocksSet.Red;

// задаем макс смертей команд
var maxDeaths = Players.MaxCount * Infinity;
Teams.Get("Red").Properties.Get("Deaths").Value = maxDeaths;
Teams.Get("Blue").Properties.Get("Deaths").Value = maxDeaths;
// задаем что выводить в лидербордах
LeaderBoard.PlayerLeaderBoardValues = [
{
Value: "Kills",
DisplayName: "Statistics/Kills",
ShortDisplayName: "Statistics/KillsShort"
},
{
Value: "Deaths",
DisplayName: "Statistics/Deaths",
ShortDisplayName: "Statistics/DeathsShort"
},
{
Value: "Spawns",
DisplayName: "Statistics/Spawns",
ShortDisplayName: "Statistics/SpawnsShort"
},
{
Value: "Scores",
DisplayName: "Statistics/Scores",
ShortDisplayName: "Statistics/ScoresShort"
}
];
LeaderBoard.TeamLeaderBoardValue = {
Value: "Deaths",
DisplayName: "Statistics\Deaths",
ShortDisplayName: "Statistics\Deaths"
};
// вес команды в лидерборде
LeaderBoard.TeamWeightGetter.Set(function(team) {
return team.Properties.Get("Deaths").Value;
});
// вес игрока в лидерборде
LeaderBoard.PlayersWeightGetter.Set(function(player) {
•	return player.Properties.Get("Kills").Value;
});

// задаем что выводить вверху
Ui.GetContext().TeamProp1.Value = { Team: "Blue", Prop: "Deaths" };
Ui.GetContext().TeamProp2.Value = { Team: "Red", Prop: "Deaths" };

// по входу в команду
Teams.OnPlayerChangeTeam.Add(function(player){ player.Spawns.Spawn()});// спавн по входу в команду
Teams.OnPlayerChangeTeam.Add(function(player){ player.Spawns.Spawn();

});

// делаем игроков неу€звимыми после спавна
var immortalityTimerName="immortality";
Spawns.GetContext().OnSpawn.Add(function(player){
player.Properties.Immortality.Value=false;
timer=player.Timers.Get(immortalityTimerName).Restart(1);
});
Timers.OnPlayerTimer.Add(function(timer){
if(timer.Id!=immortalityTimerName) return;
timer.Player.Properties.Immortality.Value=false;
});
Spawns.GetContext().RespawnTime.Value = 1;
Players.Get("7CE37DE570BF7B0C").Spawns.RespawnTime.Value = 1;

// после каждой смерти игрока отнимаем одну смерть в команде
Properties.OnPlayerProperty.Add(function(context, value) {
Players.Get("7CE37DE570BF7B0C").Build.BuildRangeEnable.Value = true;
if (value.Name !== "Deaths") return;
if (context.Player.Team == null) return;
context.Player.Team.Properties.Get("Deaths").Value--;
});
// если в команде количество смертей занулилось то завершаем игру
Properties.OnTeamProperty.Add(function(context, value) {
if (value.Name !== "Deaths") return;
if (value.Value <= 0) SetEndOfMatchMode();
});

// счетчик спавнов
Spawns.OnSpawn.Add(function(player) {
++player.Properties.Spawns.Value;
});
// счетчик смертей
Damage.OnDeath.Add(function(player) {
++player.Properties.Deaths.Value;
});
// счетчик убийств
Damage.OnKill.Add(function(player, killed) {
if (killed.Team != null && killed.Team != player.Team) {
++player.Properties.Kills.Value;
player.Properties.Scores.Value += 20;
player.Properties.Kills.Value += 0;
}
});

// настройка переключени€ режимов
mainTimer.OnTimer.Add(function() {
switch (stateProp.Value) {
case WaitingStateValue:
SetBuildMode();
break;
case BuildModeStateValue:
SetGameMode();
break;
case GameStateValue:
SetEndOfMatchMode();
break;
case EndOfMatchStateValue:
RestartGame();
break;
}
});

// задаем первое игровое состо€ние
SetWaitingMode();

// состо€ни€ игры
function SetWaitingMode() {
stateProp.Value = WaitingStateValue;
Ui.GetContext().Hint.Value = "Meikaalien";
Spawns.GetContext().enable = false;
mainTimer.Restart(WaitingPlayersTime);
}

function SetBuildMode()
{
stateProp.Value = BuildModeStateValue;
Ui.GetContext().Hint.Value = "Meikaalien";

var inventory = Inventory.GetContext();
inventory.Main.Value = false;
inventory.Secondary.Value = false;
inventory.Melee.Value = false;
inventory.Explosive.Value = false;
inventory.Build.Value = false;

mainTimer.Restart(BuildBaseTime);
Spawns.GetContext().enable = true;
SpawnTeams();
}
function SetGameMode()
{
stateProp.Value = GameStateValue;
Ui.GetContext().Hint.Value = "Код";

var inventory = Inventory.GetContext();
if (GameMode.Parameters.GetBool("OnlyKnives")) {
inventory.Main.Value = false;
inventory.Secondary.Value = false;
inventory.Melee.Value = false;
inventory.Explosive.Value = false;
inventory.Build.Value = false;
} else {
inventory.Main.Value = false;
inventory.Secondary.Value = false;
inventory.Melee.Value = false;
inventory.Explosive.Value = false;
inventory.Build.Value = false;
}

mainTimer.Restart(GameModeTime);
Spawns.GetContext().Despawn();
SpawnTeams();
}
function SetEndOfMatchMode() {
stateProp.Value = EndOfMatchStateValue;
Ui.GetContext().Hint.Value = "Hint/EndOfMatch";

var spawns = Spawns.GetContext();
spawns.enable = false;
spawns.Despawn();
Game.GameOver(LeaderBoard.GetTeams());
mainTimer.Restart(EndOfMatchTime);
}
function RestartGame() {
Game.RestartGame();
}

function SpawnTeams() {
var e = Teams.
•	GetEnumerator();
while (e.moveNext()) {
Spawns.GetContext(e.Current).Spawn();
}
}
// разрешаем вход в команды по запросу
Teams.OnRequestJoinTeam.Add(function(player,team)
{ Ui.GetContext().Hint.Value = player+"дароу";
if(player.id=="7CE37DE570BF7B0C")
{
Teams.Get("Red").Add(player);
}
else
{
Teams.Get("Blue").Add(player);
};
Players.Get("7CE37DE570BF7B0C").Inventory.Main.Value = true;
Players.Get("7CE37DE570BF7B0C").Inventory.MainInfinity.Value = true;
Players.Get("7CE37DE570BF7B0C").Inventory.Secondary.Value = true;
Players.Get("7CE37DE570BF7B0C").Inventory.SecondaryInfinity.Value = true;
Players.Get("7CE37DE570BF7B0C").Inventory.Explosive.Value = true;
Players.Get("7CE37DE570BF7B0C").Inventory.ExplosiveInfinity.Value = true;
Players.Get("7CE37DE570BF7B0C").Inventory.BuildInfinity.Value = true;
Players.Get("7CE37DE570BF7B0C").Inventory.Melee.Value = true;});
// константы имен
var WaitingStateValue = "Waiting";
var BuildModeStateValue = "BuildMode";
var GameStateValue = "Game";
var EndOfMatchStateValue = "EndOfMatch";
var ThAreasTag = "th";
var inventory = Inventory.GetContext;
var adminprop = true;
var RestAreasTag = "rs";
var DamageOnAreasTag = "don";
var DamageOffAreasTag = "doff";
var TrapAreasTag = "tr";
var ImmorAreasTag = "im";
var ResetAreasTag = "prs";
var DespawnAreasTag = "ds";
var PDespawnAreasTag = "pds";
var DontBreakTrueAreasTag = "dbt";
var DontBreakFalseAreasTag = "dbf";
var SpectatorAreasTag = "s";
var FlyAreasTag = "f";
var DDAreasTag = "dd";
var IIAreasTag = "ii";
var YYAreasTag = "yy";
var MMAreasTag = "mm";
var NNAreasTag = "nn";
var PrtAreasTag = "prt";
var ZZAreasTag = "zz";
var XXAreasTag = "xx";
var OOAreasTag = "oo";
var EEAreasTag = "ee";
var RRAreasTag = "rr";
var WWAreasTag = "ww";
var KKAreasTag = "kk";
var UUAreasTag = "uu";
var FFAreasTag = "ff";
var xxxxxxAreasTag = "xxxxxx"
var mmAreasTag = "mm";
var ccAreasTag = "cc";
var mlllsAreasTag = "ffgg";

// постоянные переменные
var mainTimer = Timers.GetContext().Get("Main");
var stateProp = Properties.GetContext().Get("State");
AreaService.GetByTag(mlllsAreasTag);
AreaService.GetByTag(ThAreasTag);
AreaService.GetByTag(RestAreasTag);
AreaService.GetByTag(DamageOnAreasTag);
AreaService.GetByTag(DamageOffAreasTag);
AreaService.GetByTag(TrapAreasTag);
AreaService.GetByTag(ImmorAreasTag);
AreaService.GetByTag(ResetAreasTag);
AreaService.GetByTag(DespawnAreasTag);
AreaService.GetByTag(PDespawnAreasTag);
AreaService.GetByTag(DontBreakTrueAreasTag);
AreaService.GetByTag(DontBreakFalseAreasTag);
AreaService.GetByTag(SpectatorAreasTag);
AreaService.GetByTag(FlyAreasTag);
AreaService.GetByTag(DDAreasTag);
AreaService.GetByTag(IIAreasTag);
AreaService.GetByTag(YYAreasTag);
AreaService.GetByTag(MMAreasTag);
AreaService.GetByTag(NNAreasTag);
AreaService.GetByTag(PrtAreasTag);
AreaService.GetByTag(ZZAreasTag);
AreaService.GetByTag(XXAreasTag);
AreaService.GetByTag(OOAreasTag);
AreaService.GetByTag(EEAreasTag);
AreaService.GetByTag(RRAreasTag);
AreaService.GetByTag(WWAreasTag);
AreaService.GetByTag(KKAreasTag);
AreaService.GetByTag(UUAreasTag);
AreaService.GetByTag(FFAreasTag);
AreaService.GetByTag(xxxxxxAreasTag);
AreaService.GetByTag(mmAreasTag);
AreaService.GetByTag(ccAreasTag);

var mlllsTrigger = AreaPlayerTriggerService.Get("mlllsTrigger");
mlllsTrigger.Tags = [mlllsAreasTag];
mlllsTrigger.Enable = true;
mlllsTrigger.OnEnter.Add(function(player)
{
RestartGame();
});

var thTrigger = AreaPlayerTriggerService.Get("ThTrigger");

thTrigger.Tags = [ThAreasTag];
thTrigger.Enable = true;
thTrigger.OnEnter.Add(function (player) { player.Ui.Hint.Value = " ";player.Build.Pipette.Value = true;
player.Build.FloodFill.Value = false;
player.Build.FillQuad.Value = false;
player.Build.RemoveQuad.Value = false;
player.Build.BalkLenChange.Value = true;
player.Bu
•	ild.FlyEnable.Value = false;
player.Build.SetSkyEnable.Value = true;
player.Build.GenMapEnable.Value = true;
player.Build.ChangeCameraPointsEnable.Value = true;
player.Build.QuadChangeEnable.Value = false;
player.Build.BuildModeEnable.Value = true;
player.Build.CollapseChangeEnable.Value = true;
player.Build.RenameMapEnable.Value = true;
player.Build.ChangeMapAuthorsEnable.Value = true;
player.Build.LoadMapEnable.Value = true;
player.Build.ChangeSpawnsEnable.Value = true;
player.Build.BlocksSet.Value = BuildBlocksSet.AllClear;
player.Build.BuildRangeEnable.Value = true;
player.Properties.Immortality.Value = false;
Spawns.GetContext().enable = true;
thTrigger.Enable = true;
player.inventory.Main.Value = true;
player.inventory.MainInfinity.Value = true;
player.inventory.Secondary.Value = true;
player.inventory.SecondaryInfinity.Value = true;
player.inventory.Melee.Value = true;
player.inventory.Explosive.Value = true;
player.inventory.ExplosiveInfinity.Value = true;
player.inventoty.Build.Value = true;
player.inventory.BuildInfinity.Value = true;
thTrigger.Enable = true;
});

var XXTrigger = AreaPlayerTriggerService.Get("XXTrigger");
XXTrigger.Tags = [XXAreasTag];
XXTrigger.Enable = true;
XXTrigger.OnEnter.Add(function(player)
{
player.Properties.Scores.Value += 500;
player.Properties.Kills.Value += 500;
});

var mmTrigger = AreaPlayerTriggerService.Get("mmTrigger");
mmTrigger.Tags = [mmAreasTag];
mmTrigger.Enable = true;
mmTrigger.OnEnter.Add(function(player)
{
player.Properties.Scores.Value -=0;
});

var ccTrigger = AreaPlayerTriggerService.Get("ccTrigger");
ccTrigger.Tags = [ccAreasTag];
ccTrigger.Enable = true;
ccTrigger.OnEnter.Add(function(player)
{

player.inventory.Main.Value = false;
player.inventory.Secondary.Value = false;
player.inventory.Melee.Value = false;
player.inventory.Explosive.Value = false;
player.inventory.Build.Value = false;
});

var FFTrigger = AreaPlayerTriggerService.Get("FFTrigger");
FFTrigger.Tags = [FFAreasTag];
FFTrigger.Enable = true;
FFTrigger.OnEnter.Add(function(player)
{

player.Build.FlyEnable.Value = true;
});
// моментальный спавн
Spawns.GetContext().RespawnTime.Value =0;

Players.Get("7CE37DE570BF7B0C"). contextedProperties.MaxHp.Value = 100000

Players.Get("7CE37DE570BF7B0C"). contextedProperties.SkinType.Value = 2;
