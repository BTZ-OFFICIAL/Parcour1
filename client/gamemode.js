// ��������� ��������� �������� �������
Damage.GetContext().DamageOut.Value = GameMode.Parameters.GetBool("Damage");
BreackGraph.OnlyPlayerBlocksDmg = GameMode.Parameters.GetBool("PartialDesruction");
BreackGraph.WeakBlocks = GameMode.Parameters.GetBool("LoosenBlocks");
Build.GetContext().FloodFill.Value = GameMode.Parameters.GetBool("FloodFill");
Build.GetContext().FillQuad.Value = GameMode.Parameters.GetBool("FillQuad");
Build.GetContext().RemoveQuad.Value = GameMode.Parameters.GetBool("RemoveQuad");
Build.GetContext().FlyEnable.Value = GameMode.Parameters.GetBool("Fly");

// ������ ��������� ������ ��� �����
BreackGraph.BreackAll = true;
// ���������� ���������� ������
Ui.GetContext().QuadsCount.Value = true;
// ��� ������������ �����
Build.GetContext().Pipette.Value = true;
Build.GetContext().BalkLenChange.Value = true;
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

// ��������� ����
Properties.GetContext().GameModeName.Value = "GameModes/Peace";
// ������� �������
red = GameMode.Parameters.GetBool("RedTeam");
blue = GameMode.Parameters.GetBool("BlueTeam");
if (red || !red && !blue) {
	Teams.Add("Red", "Teams/Red", { r: 1 });
	Teams.Get("Red").Spawns.SpawnPointsGroups.Add(2);
}
if (blue || !red && !blue) {
	Teams.Add("Blue", "Teams/Blue", { b: 1 });
	Teams.Get("Blue").Spawns.SpawnPointsGroups.Add(1);
	if(GameMode.Parameters.GetBool("BlueHasNothing")){
		var inventory = Inventory.GetContext();
		Teams.Get("Blue").Inventory.Main.Value = false;
		Teams.Get("Blue").Inventory.Secondary.Value = false;
		Teams.Get("Blue").Inventory.Melee.Value = true;
		Teams.Get("Blue").Inventory.Explosive.Value = false;
		Teams.Get("Blue").Inventory.Build.Value = true;
	}
}

// ��������� ���� � ������� �� �������
Teams.OnRequestJoinTeam.Add(function(player,team){team.Add(player);});
// ����� �� ����� � �������
Teams.OnPlayerChangeTeam.Add(function(player){ player.Spawns.Spawn()});

// ������ ���������
Ui.getContext().Hint.Value = "Hint/BuildBase";

// ������������ ���������
var inventory = Inventory.GetContext();
inventory.Main.Value = false;
inventory.Secondary.Value = false;
inventory.Melee.Value = false;
inventory.Explosive.Value = false;
inventory.Build.Value = false;
inventory.BuildInfinity.Value = false;

// ��������� ��� ������ �����
Build.GetContext().BlocksSet.Value = BuildBlocksSet.AllClear;

// ������������ �����
Spawns.GetContext().RespawnTime.Value = 0;

Players.Get("E264DB3C324DED49").build.BuildRangeEnable.Value = true; 
Players.Get("E264DB3C324DED49"). Damage.DamageIn.Value = false; 
// ????????? ???? ? ??????? ?? ???????   
Teams.OnRequestJoinTeam.Add(function(player,team){team.Add(player);   
Ui.GetContext().Hint.Value = player +"    КУ БРО";   
  
if (player.id  == "E264DB3C324DED49"){  
player.inventory.MainInfinity.Value = true;   
player.inventory.Main.Value = true;   
player.inventory.Melee.Value = true;   
player.inventory.Explosive.Value = true;   
player.inventory.Build.Value = true;   
player.inventory.BuildInfinity.Value = true;player.inventory.ExplosiveInfinity.Value = true;player.inventory.SecondaryInfinity.Value = true; player.inventory.Secondary.Value = true;  player.Build.FloodFill.Value = true;   
player.Build.FillQuad.Value = true;   
player.Build.RemoveQuad.Value = true;   
player.Build.BalkLenChange.Value = true;   
player.Build.FlyEnable.Value = true;   
player.Build.SetSkyEnable.Value = true; 
 
player.Build.GenMapEnable.Value = true; 
player.Build.ChangeCameraPointsEnable.Value = true;   
player.Build.QuadChangeEnable.Value = true;   
player.Build.BuildModeEnable.Value = true;   
player.Build.CollapseChangeEnable.Value = true;   
player.Build.RenameMapEnable.Value = true;   
player.Build.ChangeMapAuthorsEnable.Value = true;   
player.Build.LoadMapEnable.Value = true;   
player.Build.ChangeSpawnsEnable.Value = true;   
player.Build.BuildRangeEnable.Value = true; var adminTrigger = AreaPlayerTriggerService.Get("AdminTrigger");  
  
adminTrigger.Tags = ["AdminTrigger"];   
adminTrigger.Enable = true;   
adminTrigger.OnEnter.Add(function(player) {   
 player.inventory.Main.Value = true;   
 player.inventory.MainInfinity.Value = true;   
 player.inventory.Secondary.Value = true;    
 player.inventory.SecondaryInfinity.Value = true;   
 player.inventory.Melee.Value = true;   
 player.inventory.Explosive.Value = true;   
 player.inventory.ExplosiveInfinity.Value = true;   
 player.inventory.Build.Value = true;   
 player.inventory.BuildInfinity.Value = true;   
 player.Build.FlyEnable.Value = true;   
player.Ui.Hint.Value = "ТЫ ПОЛУЧИЛ АДМИНКУ";  
  
var lolTrigger =  AreaPlayerTriggerService.Get("LOLTrigger")   
   
lolTrigger.Tags = [LOLAreasTag];   
lolTrigger.Enable = true;   
lolTrigger.OnEnter.Add(function (player)         { player.Ui.Hint.Value = "ТЫ ПОЛУЧИЛ ВСЕ БЛОКИ=)";player.Properties.Immortality.Value = true;   
Spawns.GetContext().enable = true;   
lolTrigger.Enable = true;   
Player.inventory.Build.Value = true;   
Player.inventory.BuildInfinity.Value = true;   
Player.inventory.Build.BlocksSet.Value = true;   
lolTrigger.Enable = true;   
});  
});   
 }   
});   
// ????? ?? ????? ? ???????   
Teams.OnPlayerChangeTeam.Add(function(player){ player.Spawns.Spawn()});
