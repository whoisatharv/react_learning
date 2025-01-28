#requestparserupdation#
.Mappings is an object that contains path mappings for the server side resouces.WE nee to iterate over these mappings  and check if the requested resource matches any of the path.


.If a match is found ,it means the resource is a server-side resource and we should set isclientsidetechnologyresource to false and update the resource properly accordingly
