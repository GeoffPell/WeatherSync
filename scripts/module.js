// import * as weather from "./fxwrapper/weather/weather.js";
import {updateWeather} from "./fxwrapper/weather/weather.js";
import { WeatherSyncLayer } from "./controls/weatherLayer.js";

Hooks.on('simple-calendar-date-time-change', (data) => {    
    update(data);
});

Hooks.once("init", registerWrappers)


async function update(data){
    if (!canvas.scene) {
        return;
    }

    console.log("WeatherSync update ");
    updateWeather(data);

}

function registerWrappers() {
    registerCanvasWrappers();
    console.log("WeatherSync registerCanvasWrappers ");
}

function registerCanvasWrappers() {
    const methods = ["_onClickLeft", "_onDragLeftStart", "_onDragLeftMove", "_onDragLeftDrop"];
    for (const method of methods) {
        libWrapper.register("WeatherSync", `Canvas.prototype.${method}`, getWrapper(method), "WRAPPER");
    }
}


    // ==========================
Hooks.on("getSceneControlButtons", getSceneControlButtons);

function getSceneControlButtons(controls) {
    console.log("getSceneControlButtons " + controls)
    if (canvas == null) {
      return;
    }
    controls.push({
        name: "WeatherSync",
        title: "CONTROLS.WeatherSync",
        icon: "fas fa-magic",
        // layer: "weather-sync",
        visible: true,//game.user.role >= game.settings.get(packageId, "permission-create"),
        tools: [
        {
            name: "WeatherSyncControl",
            title: "CONTROLS.WeatherSyncControl",
            icon: "fas fa-hat-wizard",
            visible: true,
            onClick: () => {
            //   new SpecialsConfig().render(true);
            },
            button: true,
        }
        ]
    });
}



// ===============================
const WeatherSync = {
    _createSceneryButton(control, html, data) {
        const hasPerm = true;// game.user.role >= game.settings.get('WeatherSync', 'PERM_WeatherSync');
        if (hasPerm) {
            const name = 'scenery';
            const title = game.i18n.localize('NT.ButtonTitle');
            const icon = 'fas fa-theater-masks';
            const active = true//this.sharedState.scenery;
            const btn = $(`<li class="control-tool toggle ${active ? 'active' : ''}" title="${title}" data-tool="${name}"><i class="${icon}"></i></li>`);
            btn.on('click', () => this.scenery());
            html.find('.main-controls').append(btn);
        }
    },

    scenery(state) {
        console.log("click")
        FXMASTER.filters.removeAll();
        // if (game.user.role >= game.settings.get('narrator-tools', 'PERMScenery')) {
        //     if (!game.user.hasPermission('SETTINGS_MODIFY'))
        //         ui.notifications.error(game.i18n.localize('NT.CantModifySettings'));
        //     else
        //         this.sharedState.scenery = state ?? !this.sharedState.scenery;
        // }
    },
}

Hooks.on('renderSceneControls', WeatherSync._createSceneryButton.bind(WeatherSync));