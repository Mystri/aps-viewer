import { BaseExtension } from './BaseExtension.js';

class TestExtension extends BaseExtension {
  load() {
    super.load();
    console.log('TestExtension loaded.');
    this._button = null;

    let geom = new THREE.SphereGeometry(10, 8, 8);
    let material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    let sphereMesh = new THREE.Mesh(geom, material);
    sphereMesh.position.set(1, 2, 3);
    this._mesh = sphereMesh;


    return true;
  }

  unload() {
    super.unload();
    console.log('TestExtension unloaded.');
    if (this._button) {
      this.removeToolbarButton(this._button);
      this._button = null;
    }
    this.viewer.overlays.removeMesh(sphereMesh, 'custom-scene');
    this.viewer.overlays.removeScene('custom-scene');
    return true;
  }

  onToolbarCreated() {
    this._button = this.createToolbarButton('summary-button', 'https://img.icons8.com/small/32/brief.png', 'Show Model Summary');
    this._button.onClick = () => {
      console.log('Button Clicked!');

      // Create scene
      if (!this.viewer.overlays.hasScene('custom-scene')) {
        this.viewer.overlays.addScene('custom-scene');
      }
      // Fetch document

      // Add mesh
      this.viewer.overlays.addMesh(this._mesh, 'custom-scene');
    };
  }

  onModelLoaded(model) {
    super.onModelLoaded(model);
    this.update();
  }

  onSelectionChanged(model, dbids) {
    super.onSelectionChanged(model, dbids);
    this.update();
  }

  onIsolationChanged(model, dbids) {
    super.onIsolationChanged(model, dbids);
    this.update();
  }

  async update() {
    // TODO
  }

}

Autodesk.Viewing.theExtensionManager.registerExtension('TestExtension', TestExtension);