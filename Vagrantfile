# -*- mode: ruby -*-
# vi: set ft=ruby :

# Vagrantfile API/syntax version. Don't touch unless you know what you're doing!
VAGRANTFILE_API_VERSION = "2"

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|

  # Every Vagrant virtual environment requires a box to build off of.
  config.vm.box = "ubuntu/trusty32"

  # Create a forwarded port mapping 
  config.vm.network "forwarded_port", guest: 8080, host: 8080

  # Setup OpenDF on the box.
  config.vm.provision "shell", path: "scripts/vagrant_boot.sh"
end
